import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { PluginOption } from 'vite';

export default defineConfig({
  plugins: [react() as PluginOption],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/variables.scss";
          
        `
      }
    }
  }
});
