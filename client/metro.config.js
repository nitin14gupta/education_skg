const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)
const { resolver } = config
resolver.assetExts = Array.from(new Set([...(resolver.assetExts || []), 'glb', 'gltf', 'bin']))

module.exports = withNativeWind(config, { input: './global.css' })