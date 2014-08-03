var tabs = require("sdk/tabs"),
    pageWorkers = require("sdk/page-worker"),
    data = require("sdk/self").data,
    actionButton = require("sdk/ui/button/action");

var panel = require("sdk/panel").Panel({
    contentScriptFile: data.url("updateQRC.js"),
    contentURL: data.url("worker.html")
});

var uid, qrcodeSRC,
    host = "http://maccontroller.herokuapp.com";
//    host = "http://10.12.5.73:8001";

var button = actionButton.ActionButton({
    id: "Mac-Controller",
    label: "Mac Controller",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png"
    },
    onClick: handleClick
});

// Show the panel when the user clicks the button.
function handleClick(state) {
    panel.show({
        position: button
    });
}

panel.on("show", function() {
    panel.port.emit("updateQRC", {"uid": uid, "src": qrcodeSRC});
    console.log({"uid": uid, "src": qrcodeSRC});

});

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

        if (directive.newTab) {
            // open url in new tab
            console.log(directive.newTab);
            tabs.open(directive.newTab);
        } else if (directive.uid) {
            // set UID
            uid = directive.uid;
            console.log("UID: " + uid);
            qrcodeSRC = "https://api.qrserver.com/v1/create-qr-code/?data=" + encodeURI(host + "/?uid=" + uid) + "&size=130x130";
        } else if (directive.toDo) {
            // Might be better to establish constants with descriptive names for these numbers for code readability
            // ex. PREVIOUS_TAB = 5, SCROLL_UP = 7
            switch (directive.toDo) {
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
                    // Abstract out 50 here and in case 8 to be a constant you can easily change to mess with
                    // the scrolling amount
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
                case 9:
                    // Close tab
                    currentTab.close();
                    break;
                default:
                    return;
            }
        }
    }
});
