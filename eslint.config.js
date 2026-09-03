import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  { ignores: ['dist'] },
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // desliga a regra base (não entende sintaxe de tipo do TS, ex.: nomes de
      // parâmetro em defineEmits<{ (e: 'x'): void }>()) - só a versão do
      // @typescript-eslint (já vem em vueTsConfigs.recommended) fica ativa.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
)
