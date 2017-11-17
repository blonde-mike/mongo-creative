angular.module('database', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function ($scope, $http) {
            $scope.test = "Hello world!";
            $scope.database = [ ];
            $scope.found = {
                title: "Look At This Photograph",
                tag: "nickleback",
                url: "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/22688655_1753951231323950_4872025532762116080_n.jpg?oh=8ad3e360b8f3bff50362e079c63adc43&oe=5AA3EC64"
            };
            $scope.addToDatabase = function () {
                // $scope.comments.push({
                //     title: $scope.formContent,
                //     upvotes: 0
                // });
                // $scope.formContent = '';
                if ($scope.formContent === '' || $scope.tagContent === '' || $scope.titleContent === '') {
                    return;
                }
                console.log("In addToDatabase with " + $scope.formContent);
                $scope.create({
                    title: $scope.titleContent,
                    tag: $scope.tagContent,
                    url: $scope.formContent
                });
                $scope.titleContent = '';
                $scope.tagContent = '';
                $scope.formContent = '';
            };
            $scope.findPicture = function () {
                if ($scope.searchTag === '') return;
                return $http.get("/pictures/" + $scope.searchTag).success(function (data) {
                    // console.log(data);
                    // angular.copy(data, $scope.database);
                    $scope.searchTag = "";
                    angular.copy(data, $scope.found);
                });
            }
            // $scope.upvote = function (comment) {
            //     return $http
            //         .put("/comments/" + comment._id + "/upvote")
            //         .success(function (data) {
            //             console.log("upvote worked");
            //             comment.upvotes += 1;
            //         });
            // };
            // $scope.incrementUpvotes = function (comment) {
            //     // comment.upvotes += 1;
            //     $scope.upvote(comment);
            // };
            $scope.getAll = function () {
                return $http.get("/pictures").success(function (data) {
                    angular.copy(data, $scope.database);
                });
            };
            $scope.getAll();
            $scope.create = function (picture) {
                console.log("test");
                return $http.post('/pictures', picture).success(function (data) {
                    angular.copy(data, $scope.found);
                });
                $scope.getAll();
            };
            $scope.delete = function (comment) {
                $http
                    .delete("/comments/" + comment._id)
                    .success(function (data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
        }
    ]);