(function (module) {
    "use strict";

    var fs = require("fs");
    var path = require("path");
    var request = require("request");

    function Lib(lib_folder) {
        console.log("Deploying");
    }
    Lib.prototype.get_details = function () {
        return require(path.join(this.lib_folder, "package.json"));
    };
    Lib.prototype._post_archive = function(details, deploy_url) {

        var options = {
            url: deploy_url,
            formData:{
                url: details.repository.url,
            }
        };
        request.post(options, function (err, response, data) {
            if (err) {
                console.error("Error occurred uploading file :");
                console.error(err);
                return;
            }
            if (response.statusCode !== 201) {
                process.exit(1);
                return;
            }
        });
    };
    Lib.prototype.deploy =  function(deploy_url) {
        var details = this.get_details();
        var post = this._post_archive;
        post(details, deploy_url);

    };

    if (require.main === module) {
        var url ="https://bower.ikosenn.me/packages/madeasy";
        var app = new Lib(__dirname);
        app.deploy(url);
    }

    module.exports.Lib = Lib;

})(module);
