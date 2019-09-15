(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{395:function(s,t,n){"use strict";n.r(t);var a=n(5),e=Object(a.a)({},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"_5、联合类型"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5、联合类型","aria-hidden":"true"}},[s._v("#")]),s._v(" 5、联合类型(|)")]),s._v(" "),n("p",[s._v("联合类型（Union Types）表示取值可以为多种类型中的一种。")]),s._v(" "),n("h2",{attrs:{id:"简单的例子"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#简单的例子","aria-hidden":"true"}},[s._v("#")]),s._v(" 简单的例子")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" myFavoriteNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" string "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" number"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmyFavoriteNumber "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'seven'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmyFavoriteNumber "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" myFavoriteNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" string "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" number"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmyFavoriteNumber "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// index.ts(2,1): error TS2322: Type 'boolean' is not assignable to type 'string | number'.")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//   Type 'boolean' is not assignable to type 'number'.")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[s._v("联合类型使用 "),n("code",[s._v("|")]),s._v(" 分隔每个类型。\n这里的 "),n("code",[s._v("let myFavoriteNumber: string | number")]),s._v(" 的含义是，允许 "),n("code",[s._v("myFavoriteNumber")]),s._v(" 的类型是 "),n("code",[s._v("string")]),s._v(" 或者 "),n("code",[s._v("number")]),s._v("，但是不能是其他类型。")]),s._v(" "),n("h2",{attrs:{id:"访问联合类型的属性或方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#访问联合类型的属性或方法","aria-hidden":"true"}},[s._v("#")]),s._v(" 访问联合类型的属性或方法")]),s._v(" "),n("p",[s._v("当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们"),n("strong",[s._v("只能访问此联合类型的所有类型里共有的属性或方法")]),s._v("：")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("getLength")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("something"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" string "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" number")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" number "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" something"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//   Property 'length' does not exist on type 'number'.")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("p",[s._v("上例中，"),n("code",[s._v("length")]),s._v(" 不是 "),n("code",[s._v("string")]),s._v(" 和 "),n("code",[s._v("number")]),s._v(" 的共有属性，所以会报错。\n访问 "),n("code",[s._v("string")]),s._v(" 和 "),n("code",[s._v("number")]),s._v(" 的共有属性是没问题的：")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("getString")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("something"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" string "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" number")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" string "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" something"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("toString")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" myFavoriteNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" string "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" number"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmyFavoriteNumber "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'seven'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("myFavoriteNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 5")]),s._v("\nmyFavoriteNumber "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nconsole"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("myFavoriteNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("length"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 编译时报错")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("p",[s._v("上例中，第二行的 "),n("code",[s._v("myFavoriteNumber")]),s._v(" 被推断成了 "),n("code",[s._v("string")]),s._v("，访问它的 "),n("code",[s._v("length")]),s._v(" 属性不会报错。\n而第四行的 "),n("code",[s._v("myFavoriteNumber")]),s._v(" 被推断成了 "),n("code",[s._v("number")]),s._v("，访问它的 "),n("code",[s._v("length")]),s._v(" 属性时就报错了。")])])},[],!1,null,null,null);t.default=e.exports}}]);