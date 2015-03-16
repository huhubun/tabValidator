/* ========================================================================
 * tabValidator v0.1.0
 * https://github.com/huhubun/tabValidator
 * ========================================================================
 * Copyright 2015 huhubun
 * Licensed under MIT (https://github.com/huhubun/tabValidator/master/LICENSE)
 * ======================================================================== */

(function () {
	// constructor
	$.tabValidator = function (option) {
		$.extend(this.settings, option);
		this.init();
	}

	$.extend($.tabValidator, {
		// 获取对应Tab
		getTab: function (element) {
			// 通过元素父div获取tab的名称
			var parentElement = $(element).parents(".tab-pane");
			return $("a[href='#" + parentElement.prop("id") + "']");
		},
		// 跳转到对应Tab
		toTab: function (element) {
			var tabElement = $.tabValidator.getTab(element);
			tabElement.tab("show");
		},
		// 在Tab上显示验证错误的数量
		showBadge: function (tabBadge, elements) {
			// 重置badge
			tabBadge.each(function (index, element) {
				$(element).html('');
			})

			// 计算错误数量
			$.each(elements, function () {
				// validator.errorList 中是 this.element
				// 而$(".field-validation-error")中则为this
				var span = $.tabValidator.getTab(this.element || this).find("span");
				span.html(Number(span.html()) + 1);
			})
		},
		// 由 field-validation-error Class获取插件
		checkByClass: function (tabBadge, move) {
			// 通过.field-validation-error获取验证失败的控件
			var elements = $(".field-validation-error");
			$.tabValidator.showBadge(tabBadge, elements);

			if (elements.length > 0 && move)
				$.tabValidator.toTab(elements[0]);
		},

		prototype: {
			settings: {
				formElement: undefined,
				tabBadges: undefined
			},
			init: function () {
				$.tabValidator.checkByClass(this.settings.tabBadges, true);
				
				// jQuery Validator 公开了一个invalid-form事件，在验证失败时触发
				this.settings.formElement.bind("invalid-form", function (event, validator) {
					$.tabValidator.showBadge($.tabValidator.prototype.settings.tabBadges, validator.errorList);

					// 获取第一个验证失败的控件，跳转到对应tab
					$.tabValidator.toTab(validator.errorList[0].element);
				});

				$(":input").not("button").bind("focusout", function (event) {
					// 延迟100ms，等jQuery Validate验证完成后再操作
					setTimeout(function () {
						$.tabValidator.checkByClass($.tabValidator.prototype.settings.tabBadges, false);
					}, 100);
				})
			}
		}
	})
})();