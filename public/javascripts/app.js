angular.module('database', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function ($scope, $http) {
            $scope.test = "Hello world!";
            $scope.database = [ ];
            $scope.found = {
                title: "Welcome",
                tag: "welcome",
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcmzkKRxd9nSto17JsiJvNtherI-meKIbZNn5MLLVJ2iUkfXAD_Q"
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