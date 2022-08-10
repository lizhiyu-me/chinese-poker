# Chinese Poker
>This repo is mainly about the rule logic of Chinese poker, and it is not just for classic Chinese poker, but for the poker you want to customize.

**Just config in file <code>src/Config.ts</code> with no logic code change.**

Test your customize rule with [jest](https://jestjs.io/):
- modify <code>src/__tests__/ruler_spec.ts</code>as you want.
- run <code>npm run test </code> at rootDir to check the results.

## 扑克(斗地主)牌型检测/压牌逻辑

> 这个项目用于扑克牌的牌型配置和相应的牌型检测和大小判断,当然也适用于斗地主牌型检测/压牌逻辑

**只需要修改 <code>src/Config.ts</code> 文件,就可以配置你想要的任意牌型.**

可以使用 [jest](https://jestjs.io/) 来测试牌型的准确性:
- 修改 <code>src/__tests__/ruler_spec.ts</code>.
- 在根目录运行 <code>npm run test </code> 以测试检测结果.