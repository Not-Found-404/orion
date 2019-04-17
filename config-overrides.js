// 采用 Ant Design 官方按需加载方法
// https://ant.design/docs/react/use-in-typescript-cn#%E4%BD%BF%E7%94%A8-babel-plugin-import
const {
  override,
  fixBabelImports
} = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);
