#错误分析
|错误现象|错误原因|
|:--|:--|
1.报错如下：

``` bash
 error  in ./src/components/Logo.vue

Syntax Error: Unexpected token, expected , (10:18)

   8 | export default {
   9 |   data: () => ({
> 10 |     logoUrl: https://dashboard.daocloud.io/assets/images/logo_dcs.svg
     |                   ^
  11 |   })
  12 | }
  13 |
  ```

  原因：src后面的url没有用单引号括起来

  ``` vue
  <script>
export default {
  data: () => ({
    logoUrl: https://dashboard.daocloud.io/assets/images/logo_dcs.svg
  })
}
</script>
```
