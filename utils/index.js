const utils = {
    //生成侧边栏
    genSidebar: function(title, children = [''], collapsable = true, sidebarDepth = 1) {
        return {
            title,   // 必要的
            children,
            collapsable, // 可选的, 默认值是 true,
            sidebarDepth,    // 可选的, 默认值是 1
            
          }
    }
};

module.exports = utils;