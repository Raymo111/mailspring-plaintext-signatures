"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/* Important! We use function.name to store the selected template index!
Do not rename these methods after shipping a release with them */
const Templates = [
    function SignatureA(props) {
        return (react_1.default.createElement("div", null,
            "-- ",
            react_1.default.createElement("br", null),
            "Best,",
            react_1.default.createElement("br", null),
            props.name));
    },
    function SignatureB(props) {
        return (react_1.default.createElement("div", null,
            "-- ",
            react_1.default.createElement("br", null),
            "Sincerely,",
            react_1.default.createElement("br", null),
            props.name));
    },
    function SignatureC(props) {
        return (react_1.default.createElement("div", null,
            "-- ",
            react_1.default.createElement("br", null),
            "Regards,",
            react_1.default.createElement("br", null),
            props.name));
    },
    function SignatureD(props) {
        return (react_1.default.createElement("div", null,
            "-- ",
            react_1.default.createElement("br", null),
            "Best,",
            react_1.default.createElement("br", null),
            props.name,
            react_1.default.createElement("br", null),
            props.title));
    },
    function SignatureE(props) {
        return (react_1.default.createElement("div", null,
            "-- ",
            react_1.default.createElement("br", null),
            "Sincerely,",
            react_1.default.createElement("br", null),
            props.name,
            react_1.default.createElement("br", null),
            props.title));
    },
];
exports.default = Templates;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RlbXBsYXRlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFFMUI7aUVBQ2lFO0FBRWpFLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLFNBQVMsVUFBVSxDQUFDLEtBQUs7UUFDdkIsT0FBTyxDQUNMOztZQUNLLHlDQUFNOztZQUNKLHlDQUFNO1lBQ1YsS0FBSyxDQUFDLElBQUksQ0FDUCxDQUNQLENBQUM7SUFDSixDQUFDO0lBRUQsU0FBUyxVQUFVLENBQUMsS0FBSztRQUN2QixPQUFPLENBQ0w7O1lBQ0sseUNBQU07O1lBQ0MseUNBQU07WUFDZixLQUFLLENBQUMsSUFBSSxDQUNQLENBQ1AsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLFVBQVUsQ0FBQyxLQUFLO1FBQ3ZCLE9BQU8sQ0FDTDs7WUFDSyx5Q0FBTTs7WUFDRCx5Q0FBTTtZQUNiLEtBQUssQ0FBQyxJQUFJLENBQ1AsQ0FDUCxDQUFDO0lBQ0osQ0FBQztJQUVELFNBQVMsVUFBVSxDQUFDLEtBQUs7UUFDdkIsT0FBTyxDQUNMOztZQUNLLHlDQUFNOztZQUNKLHlDQUFNO1lBQ1YsS0FBSyxDQUFDLElBQUk7WUFBQyx5Q0FBTTtZQUNqQixLQUFLLENBQUMsS0FBSyxDQUNSLENBQ1AsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLFVBQVUsQ0FBQyxLQUFLO1FBQ3ZCLE9BQU8sQ0FDTDs7WUFDSyx5Q0FBTTs7WUFDQyx5Q0FBTTtZQUNmLEtBQUssQ0FBQyxJQUFJO1lBQUMseUNBQU07WUFDakIsS0FBSyxDQUFDLEtBQUssQ0FDUixDQUNQLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFNBQVMsQ0FBQyJ9