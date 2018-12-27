# Pagination

## 默认

```jsx
<Pagination totalPage={100} page={45} />
```

## 监听点击事件

```jsx
function pageChange(page) {
  console.log(`点击了第${page}页`);
}
<Pagination totalPage={6} size="m" onChange={pageChange} />
```