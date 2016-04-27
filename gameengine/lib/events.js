var events;
(function (events) {
    function displayObjectRectHitTest(localPoint, displayObject) {
        return localPoint.x >= 0 && localPoint.x <= displayObject.width && localPoint.y >= 0 && localPoint.y <= displayObject.height;
    }
    events.displayObjectRectHitTest = displayObjectRectHitTest;
    var EventCore = (function () {
        function EventCore() {
            var _this = this;
            this.onStageClick = function (e) {
                //获取舞台坐标
                var stageClickedPoint = new math.Point(e.offsetX, e.offsetY);
                for (var i = 0; i < _this.eventInfos.length; i++) {
                    var info = _this.eventInfos[i];
                    var globalMatrix = info.displayObject.globalMatrix;
                    var invertGlobalMatrix = math.invertMatrix(globalMatrix);
                    var newPoint = math.pointAppendMatrix(stageClickedPoint, invertGlobalMatrix);
                    //如果检测返回true，则认为点中了
                    if (info.displayObject.mouseEnabled && info.hitTest(newPoint, info.displayObject)) {
                        info.onClick(info.displayObject);
                        break;
                    }
                }
            };
        }
        EventCore.getInstance = function () {
            if (EventCore._instance == null) {
                EventCore._instance = new EventCore();
            }
            return EventCore._instance;
        };
        EventCore.prototype.init = function () {
            this.eventInfos = [];
            var canvas = document.getElementById("game");
            canvas.addEventListener("click", this.onStageClick);
        };
        EventCore.prototype.register = function (displayObject, hitTest, onClick) {
            this.eventInfos.push({ displayObject: displayObject, hitTest: hitTest, onClick: onClick });
            //this.eventInfos.unshift({ displayObject, hitTest, onClick });
        };
        EventCore.prototype.unregister = function (displayObject) {
            var _this = this;
            var index = -1;
            this.eventInfos.forEach(function (element) {
                if (element.displayObject == displayObject) {
                    index = _this.eventInfos.indexOf(element);
                }
            });
            if (index != -1) {
                this.eventInfos.splice(index);
            }
        };
        return EventCore;
    }());
    events.EventCore = EventCore;
})(events || (events = {}));
