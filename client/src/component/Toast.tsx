import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useToast, Toast } from '../context/ToastContext';

interface ToastComponentProps {
  toast: Toast;
  onHide: () => void;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ toast, onHide }) => {
  const getToastStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          backgroundColor: '#10B981',
          icon: 'checkmark-circle',
          iconColor: 'white',
        };
      case 'error':
        return {
          backgroundColor: '#EF4444',
          icon: 'close-circle',
          iconColor: 'white',
        };
      case 'warning':
        return {
          backgroundColor: '#F59E0B',
          icon: 'warning',
          iconColor: 'white',
        };
      case 'info':
        return {
          backgroundColor: '#3B82F6',
          icon: 'information-circle',
          iconColor: 'white',
        };
      default:
        return {
          backgroundColor: '#6B7280',
          icon: 'information-circle',
          iconColor: 'white',
        };
    }
  };

  const style = getToastStyle();

  return (
    <View className="absolute top-12 left-4 right-4 z-50">
      <View 
        className="flex-row items-center p-4 rounded-xl shadow-card-lg"
        style={{ backgroundColor: style.backgroundColor }}
      >
        <Ionicons name={style.icon as any} size={24} color={style.iconColor} />
        <View className="flex-1 ml-3">
          <Text className="text-white font-inter font-semibold text-body-lg">
            {toast.title}
          </Text>
          {toast.message && (
            <Text className="text-white/90 font-inter text-body-md mt-1">
              {toast.message}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={onHide} className="ml-2">
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast();

  return (
    <>
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          toast={toast}
          onHide={() => hideToast(toast.id)}
        />
      ))}
    </>
  );
};
