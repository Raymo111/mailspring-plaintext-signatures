"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mailspring_exports_1 = require("mailspring-exports");
const mailspring_component_kit_1 = require("mailspring-component-kit");
const signature_utils_1 = require("./signature-utils");
const MenuItem = mailspring_component_kit_1.Menu.Item;
class SignatureComposerDropdown extends react_1.default.Component {
    constructor(props) {
        super(props);
        this._staticIcon = (react_1.default.createElement(mailspring_component_kit_1.RetinaImg, { className: "signature-button", name: "top-signature-dropdown.png", mode: mailspring_component_kit_1.RetinaImg.Mode.ContentIsMask }));
        this._staticFooterItems = [
            react_1.default.createElement("div", { key: "edit", className: "item item-edit", onMouseDown: () => {
                    mailspring_exports_1.Actions.switchPreferencesTab('Plain-text Signatures');
                    mailspring_exports_1.Actions.openPreferences();
                } },
                react_1.default.createElement("span", null, (0, mailspring_exports_1.localized)('Edit Plain-text Signatures...'))),
        ];
        this.componentDidMount = () => {
            this.unsubscribers = [
                mailspring_exports_1.SignatureStore.listen(() => {
                    this.setState(this._getStateFromStores());
                }),
            ];
        };
        this._onChangeSignature = sig => {
            let body;
            if (sig) {
                body = (0, signature_utils_1.applySignature)(this.props.draft.body, sig);
            }
            else {
                body = (0, signature_utils_1.applySignature)(this.props.draft.body, null);
            }
            this.props.session.changes.add({ body });
        };
        this.state = this._getStateFromStores();
    }
    componentDidUpdate(previousProps) {
        if (previousProps.draftFromEmail !== this.props.draftFromEmail) {
            const nextDefaultSignature = mailspring_exports_1.SignatureStore.signatureForEmail(this.props.draftFromEmail);
            window.requestAnimationFrame(() => {
                this._onChangeSignature(nextDefaultSignature);
            });
        }
    }
    componentWillUnmount() {
        this.unsubscribers.forEach(unsubscribe => unsubscribe());
    }
    _getStateFromStores() {
        return {
            signatures: mailspring_exports_1.SignatureStore.getSignatures(),
        };
    }
    _renderSignatures() {
        // note: these are using onMouseDown to avoid clearing focus in the composer (I think)
        let currentId;
        if (AppEnv.inSpecMode()) {
            currentId = (0, signature_utils_1.currentSignatureId)(this.props.draft.body);
        }
        else {
            currentId = (0, signature_utils_1.currentSignatureIdSlate)(this.props.draft.bodyEditorState);
        }
        return (react_1.default.createElement(mailspring_component_kit_1.Menu, { headerComponents: [
                react_1.default.createElement(MenuItem, { key: 'none', onMouseDown: () => this._onChangeSignature(null), checked: !currentId, content: (0, mailspring_exports_1.localized)('No plain-text signature') }),
            ], footerComponents: this._staticFooterItems, items: Object.values(this.state.signatures), itemKey: sig => sig.id, itemChecked: sig => currentId === sig.id, itemContent: sig => react_1.default.createElement("span", { className: `signature-title-${sig.title}` }, sig.title), onSelect: this._onChangeSignature }));
    }
    render() {
        return (react_1.default.createElement("div", { className: "signature-button-dropdown" },
            react_1.default.createElement(mailspring_component_kit_1.ButtonDropdown, { bordered: false, primaryItem: this._staticIcon, menu: this._renderSignatures() })));
    }
}
exports.default = SignatureComposerDropdown;
SignatureComposerDropdown.displayName = 'SignaturePlaintextComposerDropdown';
SignatureComposerDropdown.containerRequired = false;
SignatureComposerDropdown.propTypes = {
    draft: mailspring_exports_1.PropTypes.object.isRequired,
    draftFromEmail: mailspring_exports_1.PropTypes.string,
    session: mailspring_exports_1.PropTypes.object.isRequired,
    accounts: mailspring_exports_1.PropTypes.array,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLWNvbXBvc2VyLWRyb3Bkb3duLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NpZ25hdHVyZS1jb21wb3Nlci1kcm9wZG93bi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsMkRBUzRCO0FBQzVCLHVFQUEyRTtBQUUzRSx1REFBZ0c7QUFFaEcsTUFBTSxRQUFRLEdBQUcsK0JBQUksQ0FBQyxJQUFJLENBQUM7QUFFM0IsTUFBcUIseUJBQTBCLFNBQVEsZUFBSyxDQUFDLFNBUTVEO0lBbUNDLFlBQVksS0FBSztRQUNmLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQXhCZixnQkFBVyxHQUFHLENBQ1osOEJBQUMsb0NBQVMsSUFDUixTQUFTLEVBQUMsa0JBQWtCLEVBQzVCLElBQUksRUFBQyw0QkFBNEIsRUFDakMsSUFBSSxFQUFFLG9DQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FDbEMsQ0FDSCxDQUFDO1FBRUYsdUJBQWtCLEdBQUc7WUFDbkIsdUNBQ0UsR0FBRyxFQUFDLE1BQU0sRUFDVixTQUFTLEVBQUMsZ0JBQWdCLEVBQzFCLFdBQVcsRUFBRSxHQUFHLEVBQUU7b0JBQ2hCLDRCQUFPLENBQUMsb0JBQW9CLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDdEQsNEJBQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCw0Q0FBTyxJQUFBLDhCQUFTLEVBQUMsK0JBQStCLENBQUMsQ0FBUSxDQUNyRDtTQUNQLENBQUM7UUFTRixzQkFBaUIsR0FBRyxHQUFHLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRztnQkFDbkIsbUNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO29CQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQzthQUNILENBQUM7UUFDSixDQUFDLENBQUM7UUFxQkYsdUJBQWtCLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUM7WUFDVCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxJQUFJLEdBQUcsSUFBQSxnQ0FBYyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCxJQUFJLEdBQUcsSUFBQSxnQ0FBYyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNwRDtZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQztRQXRDQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFVRCxrQkFBa0IsQ0FBQyxhQUFhO1FBQzlCLElBQUksYUFBYSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtZQUM5RCxNQUFNLG9CQUFvQixHQUFHLG1DQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN6RixNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixPQUFPO1lBQ0wsVUFBVSxFQUFFLG1DQUFjLENBQUMsYUFBYSxFQUFFO1NBQzNDLENBQUM7SUFDSixDQUFDO0lBWUQsaUJBQWlCO1FBQ2Ysc0ZBQXNGO1FBQ3RGLElBQUksU0FBaUIsQ0FBQztRQUN0QixJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUN2QixTQUFTLEdBQUcsSUFBQSxvQ0FBa0IsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0wsU0FBUyxHQUFHLElBQUEseUNBQXVCLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDdkU7UUFFRCxPQUFPLENBQ0wsOEJBQUMsK0JBQUksSUFDSCxnQkFBZ0IsRUFBRTtnQkFDaEIsOEJBQUMsUUFBUSxJQUNQLEdBQUcsRUFBRSxNQUFNLEVBQ1gsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFDaEQsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUNuQixPQUFPLEVBQUUsSUFBQSw4QkFBUyxFQUFDLHlCQUF5QixDQUFDLEdBQzdDO2FBQ0gsRUFDRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQ3pDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQzNDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQ3RCLFdBQVcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsS0FBSyxHQUFHLENBQUMsRUFBRSxFQUN4QyxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyx3Q0FBTSxTQUFTLEVBQUUsbUJBQW1CLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBRyxHQUFHLENBQUMsS0FBSyxDQUFRLEVBQ3ZGLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEdBQ2pDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxDQUNMLHVDQUFLLFNBQVMsRUFBQywyQkFBMkI7WUFDeEMsOEJBQUMseUNBQWMsSUFDYixRQUFRLEVBQUUsS0FBSyxFQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQzlCLENBQ0UsQ0FDUCxDQUFDO0lBQ0osQ0FBQzs7QUE1SEgsNENBNkhDO0FBcEhRLHFDQUFXLEdBQUcsb0NBQW9DLENBQUM7QUFFbkQsMkNBQWlCLEdBQUcsS0FBSyxDQUFDO0FBRTFCLG1DQUFTLEdBQUc7SUFDakIsS0FBSyxFQUFFLDhCQUFTLENBQUMsTUFBTSxDQUFDLFVBQVU7SUFDbEMsY0FBYyxFQUFFLDhCQUFTLENBQUMsTUFBTTtJQUNoQyxPQUFPLEVBQUUsOEJBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtJQUNwQyxRQUFRLEVBQUUsOEJBQVMsQ0FBQyxLQUFLO0NBQzFCLENBQUMifQ==