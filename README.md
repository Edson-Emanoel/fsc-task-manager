npm create vite@5.2.0 fsc-task-manager -- --template react
npx eslint --init
npm install -D prettier
npm install -D eslint-config-prettier
npx prettier --write src
npm i -D husky
npm install --save-dev lint-staged
npm install git-commit-msg-linter --save-dev
npm install -D tailwindcss@3.4.4 postcss@8.4.38 autoprefixer@10.4.19
npx tailwindcss init -p
npm install -D prettier-plugin-tailwindcss@0.6.5

# ESlint

    - P/ padronizar a escrita de código
    - Definir padrões de código, escrita, estilo e etc
    - P/ evitar erros

# Prettier

    - P/ padronizar a formatação do código

## Ambos vão rodar a cada commit

## Padroniza o código entre vários membros de equipe
