##描述:
模拟iOS选择器做的城市三级联动，仅测试过iOS没问题。

插件基于ionic中`ion-scroll`

##效果图
![效果图](demo.gif):

##安装:
`git clone https://github.com/minh8023/ionic-citypicker`

下载所有文件放到`lib`目录下

###引入文件
在 `index.html`文件中引入 `style.css, ionic-citypicker.js,ionic-citydata.js`

````html
<link href="lib/ionic-citypicker/src/style.css" rel="stylesheet">
<script src="lib/ionic-citypicker/src/ionic-citypicker.js"></script>
<script src="lib/ionic-citypicker/src/ionic-citydata.js"></script>
````    
在 `app.js`里写入文件依赖

````html
angular.module('myApp', ['ionic-citydata','ionic-citypicker']);
```` 
需要城市选择的地方写入
 
````html
<ionic-city-picker placeholder="出发城市" tag="-" backdrop=true backdrop-click-to-close=false css-class="xxx" ok-text="确定" citydata="citydata"  button-clicked="vm.cb()" ></ionic-city-picker>
````   

###一些配置
* `placeholder` string input的placeholder属性 默认“请选择城市”

* `tag`：城市之间的分割符号 默认“－”
 
* `okText` string 按钮名称 默认“确定”
  
* `buttonClicked` expression 点击“确定”后的回调函数 默认无（为了有效能使用，backdropClickToClose属性请设置为false）
  
* `backdropClickToClose` boolean  点击空白出关闭窗口 默认“flase”
  
* `citydata` string 城市数据绑定 全局在“ionic-city-picker”上不要重复否则会出错
  
* `cssClass` string 自定义自己的class
  
* `barCssClass`string 自定义自己的bar class
  
* `backdrop` boolean 遮罩层 默认“true” 呃最好别false


##版本:

### 1) v0.1.0
第一个版本提交
### 2) v0.1.1
修复没有区级城市的选择问题。

##还要做的:

1) 初始化城市定位