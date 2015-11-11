(function () {
    'use strict';

    angular
        .module('app')
        .controller('RemoveMemberGroupFacebookController', RemoveMemberGroupFacebookController);

    RemoveMemberGroupFacebookController.$inject = ['FacebookService', '$location', '$rootScope', 'Constants'];
    function RemoveMemberGroupFacebookController(FacebookService, $location, $rootScope, Constants) {
        var vm = this;
        vm.isloading = true;
        vm.GenerateLink = GenerateLink;
        vm.loading = false;
        vm.expectedlist = "nguyenthanhlong197";
        vm.maxremove = 500;
        vm.content = "";
        vm.link = "";
        vm.index = 0;
        function GenerateLink()
        {
            vm.isloading = true;
            var linkContent = "";
            linkContent += genVariable() + "\n";
            linkContent += callRun() + "\n";
            linkContent += String(runRemoveMembers) + "\n";
            linkContent += String(removeMembers) + "\n";
            linkContent += String(removeMemberWithCallback) + "\n";
            linkContent += String(clickOnSeeMore) + "\n";
            linkContent += String(clickOnSettingMember) + "\n";
            linkContent += String(clickOnRemoveMemberMenuItem) + "\n";
            linkContent += String(clickOnConfirmRemoveMemberButton) + "\n";
            linkContent += String(findFirstControl) + "\n";
            linkContent += String(getFirstControl) + "\n";
            linkContent += String(getAllMember) + "\n";

            var link = "javascript: (function () {";
            link += linkContent;
            link += "})();";
            vm.content = link;
            vm.link = convertToJSLink(link);
            vm.isloading = false;
            vm.index++;
            return link;
        }
        function removeCommentLink(str)
        {

            var rem = str.split("\r\n");
            rem = $.grep(rem, function (value, idx) {
                return value.indexOf("//") < 0;
            });
            return rem.join();
        }
        function convertToJSLink(str)
        {
            var res = str;
            
            res = res.replace("\t", " ");
            res = res.replace("  ", " ");
            res = res.replace("\r\n", "");
            res = res.replace("{ ", "{");
            res = res.replace("= ", "=");
            res = res.replace(" =", "=");
            res = res.replace("; ", ";");
            res = res.replace(" ;", ";");
            res = res.replace(" ", "%20");
            
            return res;
        }
        function callRun()
        {
            var res = "runRemoveMembers();"
            return res;
        }
        var MAX_WAIT = 250;
        var MAX_SEE_MORE = 5;
        var EXCEPTED_LIST = [];
        var MAX_REMOVE = 1000;
        var oldmembers = [];
        var newmembers = [];
        var COUNT = 0;
        function genVariable()
        {
            var res = "";

            res += "  var MAX_WAIT = " + MAX_WAIT + ";"
                  + " var MAX_SEE_MORE = " + MAX_SEE_MORE + ";"
                  + " var EXCEPTED_LIST = [" + getExpectedList() + "];"
                  + " var MAX_REMOVE = " + vm.maxremove + ";"
                  + " var oldmembers = [];"
                  + " var newmembers = [];"
                  + " var COUNT = 0;";
            return res;
        }
        function getExpectedList()
        {
            if (vm.expectedlist == "")
            {
                return "";
            }
            var list = vm.expectedlist.replace(" ", "").split(",");
            var res = "'" + list.join("','") + "'";
            return res;
        }























            
        function runRemoveMembers() {
            console.debug("runRemoveMembers");
            clickOnSeeMore();
            var timer = setInterval(function () {
                
                newmembers = getAllMember(EXCEPTED_LIST);
                
                var i = 0;
                for (i; i < oldmembers.length; i++) {
                    var oldmember = oldmembers[i];
                    var j = 0;
                    for (j; j < newmembers.length; j++) {
                        var newmember = newmembers[j];
                        if (oldmember == newmember) {
                            newmembers.splice(j, 1);
                            break;
                        }
                    }
                }
                oldmembers = oldmembers.concat(newmembers);
                console.debug("newmembers " + newmembers.length);
                if (newmembers.length < 0 || MAX_REMOVE < 0) {
                    return 1;
                }
                else {
                    removeMembers(newmembers, 0, function () {                        
                        runRemoveMembers();
                    });
                }
                clearInterval(timer);
            }, MAX_SEE_MORE * 1000);

        }
        function removeMembers(members, i, callback) {

            if (i >= members.length || MAX_REMOVE < 0) {
                callback();
            } else {
                var member = members[i];
                removeMemberWithCallback(member, function () {
                    i++;
                    MAX_REMOVE--;
                    COUNT++;

                    removeMembers(members, i, callback);

                });
            }
        }
        function removeMemberWithCallback(member, CallbackWhenRemoveMemberDone) {
            var uid = member.getAttribute("id").split("_")[1];
            var mbstr = "member" + "_" + uid;
            clickOnSettingMember(mbstr, function () {
                clickOnRemoveMemberMenuItem(uid, function () {
                    clickOnConfirmRemoveMemberButton(uid, CallbackWhenRemoveMemberDone);
                });
            });
        }
        function clickOnSeeMore() {
            var a_see_more_path = '//a[contains(@href, "/ajax/browser/list/group_")]';
            getFirstControl(a_see_more_path,
             function (a_seemore) {
                 if (a_seemore != null && a_seemore != undefined) {
                     a_seemore.click();
                 }
             });
        }
        function clickOnSettingMember(mbstr, callback) {
            var memberSettingPath = '//div[(contains(@class,"clearfix")) and (contains(@id,"' + mbstr + '"))]//a[(contains(@role,"button")) and (contains(@rel,"toggle")) and (contains(@id,"u_")) ]';
            findFirstControl(memberSettingPath,
             function (a_setting) {
                 a_setting.click();
                 callback();
             });
        }
        function clickOnRemoveMemberMenuItem(uid, callback) {
            var remvoePath = '//a[(contains(@href,"&uid=' + uid + '")) and (contains(@href,"groups/members/remove")) and (contains(@role,"menuitem"))]';
            findFirstControl(remvoePath,
             function (removelink) {
                 removelink.click();
                 callback();
             });

        }
        function clickOnConfirmRemoveMemberButton(uid, callbackwhendone) {
            var btnPath = '//form[(contains(@action,"groups/members/remove")) and (contains(@action,"&uid=' + uid + '"))]//button';
            var btnCancelPath = '//form[(contains(@action,"groups/members/remove")) and (contains(@action,"&uid=' + uid + '"))]//a[@title="Close"]';
            findFirstControl(btnCancelPath,
             function (btnCancel) {
                 console.debug("Remove " + uid + "    " + COUNT);
                 btnCancel.click();
                 callbackwhendone();
             });
        }
        function findFirstControl(xpath, callbackwithcontrol) {
            var counter = 0;
            var timer = setInterval(function () {
                var ctr = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                var control = ctr.singleNodeValue;
                if (counter >= MAX_WAIT || (control != null && control != undefined)) {
                    clearInterval(timer);
                    if (control != null && control != undefined) {
                        callbackwithcontrol(control);
                    }
                }
                counter++;
            }, 100);
        }
        function getFirstControl(xpath, callbackwithcontrol) {
            var ctr = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            var control = ctr.singleNodeValue;
            callbackwithcontrol(control);
        }
        function sleep(ms) {
            var unixtime_ms = new Date().getTime();
            while (new Date().getTime() < unixtime_ms + ms) { }
        }
        function getAllMember(exceptList) {
            
            var except = "";
            var i = 0;
            for (i; i < exceptList.length; i++) {
                except += '(not(contains(@href,"' + exceptList[i] + '"))) and ';
            }
            if (exceptList.length > 0) {
                except = except.substring(0, except.length - 5);
                except = '[' + except + ']'
            }
            var members = [];
            var membersPath = '//div[(contains(@class,"clearfix")) and (contains(@id,"member")) and (./div/div/div[2]/div[1]/a' + except + ')]';
           
            var mb = document.evaluate(membersPath, document, null, XPathResult.ANY_TYPE, null);
            var res = mb.iterateNext();
            while (res) {
                members.push(res);
                res = mb.iterateNext();
            }
            return members;
        }
    }

})();
