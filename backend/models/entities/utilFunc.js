/**
 * standard error handler for local functions
 * it prints error message in detail in console
 *
 * @param {Error} err
  * @param {String} file_name of where the function is called
 * @param {String} function_name of the error happens
 * @param {...string} args
 */

module.exports = {
	HandleError: function (err, file, function_name, ...args) {
    console.log("================", file, "================================");
    console.log("internal error at function " + function_name);
    console.log("input param for the error: ");
    for (var i=1; i<args.length; i++) {
        console.log(args[i]);
    }
    console.log("error message: " + err.message);
    console.log("==============================================================")
	}
}
