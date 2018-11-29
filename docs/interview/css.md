# css

## 实现已知或者未知宽度的垂直水平居中

```css
// 1
.wrapper{
  position: relative;
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px
    margin-left: -50px;
    margin-right: -50px;
  }
}

// 2
.wrapper {
  position: relative;
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px;
    transform: translate(-50%,-50%);
  }
}

// 3
.wrapper {
  display: flex;
  justify-content: center;
  align-item: center;
}

// 4
.wrapper {
  display: table;
  .box {
    display: table-cell;
    vertical-align: middle;
  }
}
```
