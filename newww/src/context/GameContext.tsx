import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
  category: 'streak' | 'study' | 'quiz' | 'social' | 'special';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export interface Level {
  level: number;
  xpRequired: number;
  xpCurrent: number;
  title: string;
  color: string;
}

export interface Streak {
  current: number;
  longest: number;
  lastActivity: string;
  streakType: 'daily' | 'weekly' | 'monthly';
}

export interface League {
  id: string;
  name: string;
  rank: number;
  totalMembers: number;
  color: string;
  icon: string;
}

export interface GameStats {
  totalXP: number;
  level: Level;
  streak: Streak;
  achievements: Achievement[];
  badges: Badge[];
  league: League;
  weeklyXP: number;
  monthlyXP: number;
  totalStudyTime: number; // in minutes
  quizzesCompleted: number;
  videosWatched: number;
  notesCreated: number;
}

interface GameContextType {
  stats: GameStats | null;
  isLoading: boolean;
  addXP: (amount: number, source: string) => Promise<void>;
  updateStreak: () => Promise<void>;
  unlockAchievement: (achievementId: string) => Promise<void>;
  unlockBadge: (badgeId: string) => Promise<void>;
  updateStudyTime: (minutes: number) => Promise<void>;
  incrementQuiz: () => Promise<void>;
  incrementVideo: () => Promise<void>;
  incrementNotes: () => Promise<void>;
  resetDailyStats: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

const INITIAL_LEVEL: Level = {
  level: 1,
  xpRequired: 100,
  xpCurrent: 0,
  title: 'Rookie Learner',
  color: '#4F46E5',
};

const INITIAL_STREAK: Streak = {
  current: 0,
  longest: 0,
  lastActivity: new Date().toISOString(),
  streakType: 'daily',
};

const INITIAL_LEAGUE: League = {
  id: 'bronze',
  name: 'Bronze League',
  rank: 1,
  totalMembers: 1000,
  color: '#CD7F32',
  icon: '🥉',
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_login',
    title: 'Welcome!',
    description: 'Complete your first login',
    icon: '👋',
    xpReward: 10,
    category: 'special',
  },
  {
    id: 'first_quiz',
    title: 'Quiz Master',
    description: 'Complete your first quiz',
    icon: '🧠',
    xpReward: 25,
    category: 'quiz',
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day study streak',
    icon: '🔥',
    xpReward: 100,
    category: 'streak',
  },
  {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    xpReward: 50,
    category: 'study',
  },
];

const BADGES: Badge[] = [
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Study before 8 AM',
    icon: '🐦',
    rarity: 'common',
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Study after 10 PM',
    icon: '🦉',
    rarity: 'common',
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Get 100% on a quiz',
    icon: '💯',
    rarity: 'rare',
  },
  {
    id: 'marathon',
    name: 'Study Marathon',
    description: 'Study for 3+ hours in one session',
    icon: '🏃',
    rarity: 'epic',
  },
];

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [stats, setStats] = useState<GameStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGameStats();
  }, []);

  const loadGameStats = async () => {
    try {
      const savedStats = await AsyncStorage.getItem('gameStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      } else {
        // Initialize with default stats
        const initialStats: GameStats = {
          totalXP: 0,
          level: INITIAL_LEVEL,
          streak: INITIAL_STREAK,
          achievements: [],
          badges: [],
          league: INITIAL_LEAGUE,
          weeklyXP: 0,
          monthlyXP: 0,
          totalStudyTime: 0,
          quizzesCompleted: 0,
          videosWatched: 0,
          notesCreated: 0,
        };
        setStats(initialStats);
        await AsyncStorage.setItem('gameStats', JSON.stringify(initialStats));
      }
    } catch (error) {
      console.error('Error loading game stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveStats = async (newStats: GameStats) => {
    try {
      setStats(newStats);
      await AsyncStorage.setItem('gameStats', JSON.stringify(newStats));
    } catch (error) {
      console.error('Error saving game stats:', error);
    }
  };

  const addXP = async (amount: number, source: string) => {
    if (!stats) return;

    const newTotalXP = stats.totalXP + amount;
    const newLevel = calculateLevel(newTotalXP);
    
    const updatedStats: GameStats = {
      ...stats,
      totalXP: newTotalXP,
      level: newLevel,
      weeklyXP: stats.weeklyXP + amount,
      monthlyXP: stats.monthlyXP + amount,
    };

    await saveStats(updatedStats);

    // Check for level up achievements
    if (newLevel.level > stats.level.level) {
      await unlockAchievement('level_5');
    }
  };

  const calculateLevel = (totalXP: number): Level => {
    const level = Math.floor(totalXP / 100) + 1;
    const xpRequired = level * 100;
    const xpCurrent = totalXP % 100;
    
    const titles = ['Rookie Learner', 'Rising Star', 'Smart Student', 'Knowledge Seeker', 'Study Champion', 'Learning Master', 'Academic Ace', 'Study Legend'];
    const colors = ['#4F46E5', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316'];
    
    return {
      level,
      xpRequired,
      xpCurrent,
      title: titles[Math.min(level - 1, titles.length - 1)],
      color: colors[Math.min(level - 1, colors.length - 1)],
    };
  };

  const updateStreak = async () => {
    if (!stats) return;

    const today = new Date().toDateString();
    const lastActivity = new Date(stats.streak.lastActivity).toDateString();
    
    let newStreak = { ...stats.streak };
    
    if (today === lastActivity) {
      // Same day, no change
      return;
    } else if (new Date(today).getTime() - new Date(lastActivity).getTime() === 86400000) {
      // Next day, increment streak
      newStreak.current += 1;
      newStreak.longest = Math.max(newStreak.current, newStreak.longest);
    } else {
      // Gap in days, reset streak
      newStreak.current = 1;
    }
    
    newStreak.lastActivity = new Date().toISOString();

    const updatedStats: GameStats = {
      ...stats,
      streak: newStreak,
    };

    await saveStats(updatedStats);

    // Check for streak achievements
    if (newStreak.current === 7) {
      await unlockAchievement('streak_7');
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!stats) return;

    const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement || stats.achievements.some(a => a.id === achievementId)) return;

    const unlockedAchievement = {
      ...achievement,
      unlockedAt: new Date().toISOString(),
    };

    const updatedStats: GameStats = {
      ...stats,
      achievements: [...stats.achievements, unlockedAchievement],
    };

    await saveStats(updatedStats);
    await addXP(achievement.xpReward, 'achievement');
  };

  const unlockBadge = async (badgeId: string) => {
    if (!stats) return;

    const badge = BADGES.find(b => b.id === badgeId);
    if (!badge || stats.badges.some(b => b.id === badgeId)) return;

    const unlockedBadge = {
      ...badge,
      unlockedAt: new Date().toISOString(),
    };

    const updatedStats: GameStats = {
      ...stats,
      badges: [...stats.badges, unlockedBadge],
    };

    await saveStats(updatedStats);
  };

  const updateStudyTime = async (minutes: number) => {
    if (!stats) return;

    const updatedStats: GameStats = {
      ...stats,
      totalStudyTime: stats.totalStudyTime + minutes,
    };

    await saveStats(updatedStats);
    await addXP(Math.floor(minutes / 5), 'study_time'); // 1 XP per 5 minutes
  };

  const incrementQuiz = async () => {
    if (!stats) return;

    const updatedStats: GameStats = {
      ...stats,
      quizzesCompleted: stats.quizzesCompleted + 1,
    };

    await saveStats(updatedStats);
    await addXP(10, 'quiz_completed');
    await unlockAchievement('first_quiz');
  };

  const incrementVideo = async () => {
    if (!stats) return;

    const updatedStats: GameStats = {
      ...stats,
      videosWatched: stats.videosWatched + 1,
    };

    await saveStats(updatedStats);
    await addXP(5, 'video_watched');
  };

  const incrementNotes = async () => {
    if (!stats) return;

    const updatedStats: GameStats = {
      ...stats,
      notesCreated: stats.notesCreated + 1,
    };

    await saveStats(updatedStats);
    await addXP(8, 'notes_created');
  };

  const resetDailyStats = async () => {
    if (!stats) return;

    const updatedStats: GameStats = {
      ...stats,
      weeklyXP: 0,
    };

    await saveStats(updatedStats);
  };

  const value: GameContextType = {
    stats,
    isLoading,
    addXP,
    updateStreak,
    unlockAchievement,
    unlockBadge,
    updateStudyTime,
    incrementQuiz,
    incrementVideo,
    incrementNotes,
    resetDailyStats,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
