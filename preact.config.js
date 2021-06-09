/* eslint-disable no-param-reassign */
import { resolve } from 'path';

export default {
    /**
     * Function that mutates the original webpack config.
     * Supports asynchronous changes when a promise is returned (or it's an async function).
     *
     * @param {object} config - original webpack config.
     * @param {object} env - options passed to the CLI.
     * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
     * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
     * */
    webpack(config, env, helpers, options) {
        config.module.rules[4].use.splice(1, 0, {
            loader: '@teamsupercell/typings-for-css-modules-loader',
            options: {
                banner:
                    '// This file is automatically generated from your CSS. Any edits will be overwritten.',
                disableLocalsExport: true,
            },
        });

        // Use any `index` file, not just index.js
        // eslint-disable-next-line no-param-reassign
        config.resolve.alias['preact-cli-entrypoint'] = resolve(
            process.cwd(),
            'src',
            'index',
        );

        if (env.production) {
            config.target = 'electron-renderer';
            config.output.publicPath = env.pkg.homepage;
            const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
            plugin.definitions.PUBLIC_PATH = env.pkg.homepage;
        }
    },
};

