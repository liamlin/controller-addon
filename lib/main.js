var tabs = require("sdk/tabs"),
    pageWorkers = require("sdk/page-worker"),
    data = require("sdk/self").data,
    toggleButton = require("sdk/ui/button/toggle");

//var panel = require("sdk/panel").Panel({
//    contentURL: data.url("worker.html"),
//    contentStyle: "body { border: 3px solid blue; }"
//});
//var uid;
//
//var button = toggleButton.ToggleButton({
//    id: "Mac-Controller",
//    label: "Mac Controller",
//    icon: {
//        "16": "./icon-16.png",
//        "32": "./icon-32.png",
//        "64": "./icon-64.png"
//    },
//    onClick: handleClick
//});
//
//// Show the panel when the user clicks the button.
//function handleClick(state) {
//  panel.show();
//}

pageWorkers.Page({
    contentScriptFile: [
        data.url("jquery-2.1.0.min.js"),
        data.url("socket-io.js"),
        data.url("myjs.js")],
    contentURL: data.url("worker.html"),
    contentScriptFileWhen: "ready",
    onMessage: function(directive) {
        var currentTab = tabs.activeTab,
            currentTabIndex = currentTab.index,
            tabsLength = tabs.length,
            newIndex,
            scrollScripts;
        switch (directive) {
            case 5:
                // Previous Tab
                if (tabsLength > 1) {
                    newIndex = ((currentTabIndex == 0) ? tabsLength : currentTabIndex) - 1;
                    tabs[newIndex].activate();
                }
                break;
            case 6:
                // Next Tab
                if (tabsLength > 1) {
                    newIndex = (currentTabIndex == (tabsLength - 1)) ? 0 : currentTabIndex + 1;
                    tabs[newIndex].activate();
                }
                break;
            case 7:
                // Scroll Up
                scrollScripts = "window.scrollBy(0, -50);";
                currentTab.attach({
                    contentScript: scrollScripts
                });
                break;
            case 8:
                // Scroll Down
                scrollScripts = "window.scrollBy(0, 50);";
                currentTab.attach({
                    contentScript: scrollScripts
                });
                break;
            default:
                return;
        }
    }
});
//
//pageWorkers.port.on("uid", function(newUid){
//    uid = newUid;
//    console.log("UID: " + uid);
//});
//
//pageWorkers.port.on("newTab", function(url){
//    console.log(url);
//    tabs.open(url);
//});