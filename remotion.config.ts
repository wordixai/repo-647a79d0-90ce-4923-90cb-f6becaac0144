import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
Config.setConcurrency(4);
Config.setQuality(95);

// Enable experimental features for better performance
Config.setChromiumOpenGlRenderer('egl');
Config.setChromiumHeadlessMode(true);