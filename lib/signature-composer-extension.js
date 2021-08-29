"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailspring_exports_1 = require("mailspring-exports");
const signature_utils_1 = require("./signature-utils");
class SignatureComposerExtension extends mailspring_exports_1.ComposerExtension {
}
exports.default = SignatureComposerExtension;
SignatureComposerExtension.prepareNewDraft = ({ draft }) => {
    const from = draft.from && draft.from[0];
    const signatureObj = from ? mailspring_exports_1.SignatureStore.signatureForEmail(from.email) : null;
    if (!signatureObj) {
        return;
    }
    draft.body = (0, signature_utils_1.applySignature)(draft.body, signatureObj);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLWNvbXBvc2VyLWV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduYXR1cmUtY29tcG9zZXItZXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXVFO0FBQ3ZFLHVEQUFtRDtBQUVuRCxNQUFxQiwwQkFBMkIsU0FBUSxzQ0FBaUI7O0FBQXpFLDZDQVNDO0FBUlEsMENBQWUsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtJQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQ0FBYyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2hGLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDakIsT0FBTztLQUNSO0lBQ0QsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFBLGdDQUFjLEVBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUMifQ==