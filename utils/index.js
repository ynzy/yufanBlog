const utils = {
    //生成侧边栏
    genSidebar: function(title, children = [''], collapsable = false, sidebarDepth = 3) {
        return {
            title,   // 必要的
            children,
            collapsable, // 是否折叠侧边栏，可选的, 默认值是 false,
            sidebarDepth,    // 可选的, 默认值是 1
            
          }
    }
};

module.exports = utils;