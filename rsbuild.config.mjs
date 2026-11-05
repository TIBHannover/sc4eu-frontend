import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig(({ command }) => {
    const mode = command === 'dev' ? 'development' : 'production';
    process.env.NODE_ENV = mode;

    const { publicVars, rawPublicVars } = loadEnv({ mode, prefixes: ['REACT_APP_'], processEnv: { ...process.env } });

    const BASE = '/' + rawPublicVars.REACT_APP_PUBLIC_URL.replace(/^\/+|\/+$/g, '');

    const instance = rawPublicVars.REACT_APP_INSTANCE || 'default';
    const instanceDir = path.resolve('src/instances', instance);
    if (!fs.existsSync(instanceDir)) {
        throw new Error(`REACT_APP_INSTANCE="${instance}": folder src/instances/${instance} does not exist`);
    }

    return {
        mode,
        plugins: [pluginReact(), pluginSass()],

        source: {
            define: {
                ...publicVars,
                'process.env': JSON.stringify(rawPublicVars)
            }
        },

        resolve: {
            alias: { '@instance': [instanceDir, path.resolve('src/instances/default')] }
        },

        tools: {
            rspack: config => {
                config.resolve ??= {};
                config.resolve.modules = ['node_modules', path.resolve('node_modules'), path.resolve('src')];
                return config;
            }
        },

        html: {
            template: './public/index.html'
        },

        server: {
            base: BASE,
            port: 3000
        },

        output: {
            distPath: { root: 'build' },
            assetPrefix: `${BASE}/`,
            polyfill: 'usage',
            ...(mode === 'production' && {
                sourceMap: { js: process.env.GENERATE_SOURCEMAP === 'false' ? false : 'source-map', css: false }
            })
        }
    };
});
