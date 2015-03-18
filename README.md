# tabValidator
![](https://github.com/huhubun/tabValidator/raw/master/images/sample.png)
tabValidator 是一个帮助表单在Tab标签上显示错误数量，并自动跳转到对应Tab页的小插件。
当表单中有许多内容，又必须在一页中进行显示时，我会为它添加标签页，但这时表单验证的提示就会变得很麻烦，于是 tabValidator 诞生了！

## 功能
tabValidator 可以完成这些事情
* 在Tab标签上显示每个Tab标签对应Tab页的表单错误数量
* 自动跳转到存在错误的标签页
* 支持服务器端生成的jQuery Validate错误标记

## 依赖
tabValidator 依赖以下插件：
* [jQuery](https://github.com/jquery/jquery)
* [Bootstrap](https://github.com/twbs/bootstrap)
* jquery.validate
* [jquery.validate.unobtrusive](https://github.com/aspnet/jquery-validation-unobtrusive)

## 安装
#### NuGet
```powershell
Install-Package bun.tabValidator
```

## 使用
要使用 tabValidator，您必须准备好上一节中的依赖，如果使用ASP.NET MVC5创建的项目，将自动包含这些插件，若是其它框架或平台，可以尝试通过NuGet或其他手段添加上述依赖。

* 根据您的实际情况，添加 tabValidator 脚本引用
```html
<script src="./Scripts/bun.tabValidator.js"></script>
```
* 取消 jQuery Validate 的忽略设置，请确保这一步操作在 jquery.validate 控件载入之后进行
```javascript
  $.validator.setDefaults({ ignore: [] });
```
* 添加 form 标记，并包裹住tab页，tab页的内容为表单内容。Bootstrap tab.js 具体使用方法参见 http://v3.bootcss.com/javascript/#tabs
```html
<form action="/" method="post" novalidate="novalidate">
    <div role="tabpanel">
        <ul class="nav nav-tabs" role="tablist">
            <li class="active" role="presentation"><a role="tab" href="#general" data-toggle="tab">General <span class="label label-danger"></span></a></li>
        </ul>
        <div class="row tab-content" style="margin-top: 1em;">
            <div class="tab-pane fade in active form-horizontal" id="general" role="tabpanel">
                <div class="col-xs-12 col-md-6">
                    <div class="form-group">
                        <label class="control-label col-xs-4" for="FirstName">FirstName</label>
                        <div class="col-xs-8">
                            <input name="FirstName" class="form-control input-sm" id="FirstName" type="text" placeholder="Required" value="" data-val-required="FirstName is required" data-val="true">
                            <span class="field-validation-valid" data-valmsg-replace="true" data-valmsg-for="FirstName"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-xs-4" for="LastName">LastName</label>
                        <div class="col-xs-8">
                            <input name="LastName" class="form-control input-sm" id="LastName" type="text" placeholder="Required" value="" data-val-required="LastName is required" data-val="true">
                            <span class="field-validation-valid" data-valmsg-replace="true" data-valmsg-for="LastName"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row text-center">
            <button class="btn btn-default" type="submit">Submit</button>
        </div>
    </div>
</form>
```
与Bootstrap的标签页不同的是，我们需要预留错误显示的位置，错误显示通过Bootstrap的“标签（label）”组件实现，将它添加到 tablist 的每一个节点中，即：
```html
<li class="active" role="presentation"><a role="tab" href="#general" data-toggle="tab">General <span class="label label-danger"></span></a></li>
```
注意：tabValidator 通过ID关联Tab标签和标签页，请将错误显示位置放在正确的地方。
另外，要启用jQuery Validate验证，需要添加对应标记（若是ASP.NET MVC，请使用Razor），如：
```html
<span class="field-validation-valid" data-valmsg-replace="true" data-valmsg-for="LastName"></span>
```
* 初始化 tabValidator
```javascript
new $.tabValidator({
    // 要监控的表单
    formElement: $($("form")[0]),
    // 展示的容器
    tabBadges: $(".label.label-danger")
});
```
formElement 表示form表单jQuery对象，选中包裹住 tab 页的表单即可
tabBadges 表示错误数量显示的位置
* 在ASP.NET MVC中，若没进行了服务器端验证，服务器端会自动生成这样的标记
```html
<span class="field-validation-error" data-valmsg-replace="true" data-valmsg-for="PostCode">Language is required</span>
```
tabValidator 支持将这些错误数量一同统计并显示，同时支持自动跳转到第一个错误所在的标签页中

具体演示，请参见 https://github.com/huhubun/tabValidator/tree/master/demos

## Copyright and license
Code and documentation copyright 2015 huhubun. Code released under [the MIT license](https://github.com/huhubun/tabValidator/blob/master/LICENSE)
