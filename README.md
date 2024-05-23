# nomix

[nomix](https://github.com/vzt7/nomix) 是一个基于 [@preact/signals-core](https://github.com/preactjs/signals) 的小程序状态管理工具。

# Install

```shell
# with npm
npm i nomix

# with yarn
yarn add nomix

# with pnpm
pnpm i nomix
```

# Usage

[nomix](https://github.com/vzt7/nomix) 仅额外提供 `createStore` 方法用于处理小程序状态更新和类型提示，其他 API 及使用方法参考 [@preact/signals-core](https://github.com/preactjs/signals) 。

```ts
import { createStore, signal, computed } from 'nomix';

const user = signal({
  name: 'unknown',
  id: '0',
});

const username = computed(() => {
  const { name, id } = user.value;
  return `${name}#${id}`;
});

const userStore = createStore({
  username,
});

Component({
  behaviors: [userStore.behaviors],
  data: {
    // 用于给 Typescript 项目提供类型提示（ JS 项目可不传 ）
    ...userStore.initialState,
  },
});
```
