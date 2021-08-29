"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { remote } from 'electron';
const react_1 = __importDefault(require("react"));
const mailspring_exports_1 = require("mailspring-exports");
const mailspring_component_kit_1 = require("mailspring-component-kit");
const constants_1 = require("./constants");
const signature_account_default_picker_1 = __importDefault(require("./signature-account-default-picker"));
const signature_template_picker_1 = __importDefault(require("./signature-template-picker"));
const templates_1 = __importDefault(require("./templates"));
class SignatureEditor extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this._onTitleChange = event => {
            const sig = this.props.signature;
            mailspring_exports_1.Actions.upsertSignature(Object.assign(Object.assign({}, sig), { title: event.target.value }), sig.id);
        };
        this._onRawBodyChange = async (event) => {
            const sig = this.props.signature;
            let body = event.target.value;
            try {
                body = await mailspring_exports_1.InlineStyleTransformer.run(body);
            }
            catch (err) {
                //no-op
            }
            mailspring_exports_1.Actions.upsertSignature(Object.assign(Object.assign({}, sig), { body }), sig.id);
        };
        this._onDataFieldChange = event => {
            const { id, value } = event.target;
            const sig = this.props.signature;
            // If you have raw selected and are switching back to a template,
            // display a warning UNLESS the html is an unmodified template HTML
            //     if (id === 'templateName' && !sig.data.templateName && value) {
            //       const htmlMatchesATemplate = Templates.find(
            //         t => sig.body === RenderSignatureData({ ...sig.data, templateName: t.name })
            //       );
            //       if (!htmlMatchesATemplate) {
            //         const idx = remote.dialog.showMessageBoxSync({
            //           type: 'warning',
            //           buttons: [localized('Cancel'), localized('Continue')],
            //           message: localized('Revert custom signature?'),
            //           detail: localized(
            //             "Switching back to a signature template will overwrite the custom signature you've entered."
            //           ),
            //         });
            //         if (idx === 0) {
            //           return;
            //         }
            //       }
            //     }
            // apply change
            sig.data = Object.assign(Object.assign({}, sig.data), { [id]: value });
            // re-render
            if (sig.data.templateName) {
                const template = templates_1.default.find(t => t.name === sig.data.templateName);
                if (template) {
                    sig.body = (0, constants_1.RenderSignatureData)(sig.data);
                }
            }
            mailspring_exports_1.Actions.upsertSignature(sig, sig.id);
        };
    }
    render() {
        const { accountsAndAliases, defaults } = this.props;
        let signature = this.props.signature;
        let empty = false;
        if (!signature) {
            signature = {
                id: '',
                body: '',
                title: '',
                data: { title: '', templateName: templates_1.default[0].name },
            };
            empty = true;
        }
        const data = signature.data || {};
        const resolvedData = (0, constants_1.ResolveSignatureData)(data);
        return (react_1.default.createElement("div", { className: `signature-wrap ${empty && 'empty'}` },
            react_1.default.createElement("div", { className: "section basic-info" },
                react_1.default.createElement("input", { type: "text", id: "title", placeholder: (0, mailspring_exports_1.localized)('Name'), value: signature.title || '', onChange: this._onTitleChange }),
                react_1.default.createElement("div", { style: { flex: 1 } }),
                react_1.default.createElement(signature_account_default_picker_1.default, { signature: signature, accountsAndAliases: accountsAndAliases, defaults: defaults })),
            react_1.default.createElement("div", { className: "section" },
                react_1.default.createElement(signature_template_picker_1.default, { resolvedData: resolvedData, onChange: this._onDataFieldChange })),
            react_1.default.createElement("div", { key: "header", className: "section-header" }, (0, mailspring_exports_1.localized)('Raw Source')),
            ",",
            react_1.default.createElement("textarea", { id: "body", key: `textarea ${signature.id}`, className: "section raw-html", spellCheck: false, onChange: this._onRawBodyChange, defaultValue: signature.body || '' })));
    }
}
class PreferencesSignatures extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.unsubscribers = [];
        this._onChange = () => {
            this.setState(this._getStateFromStores());
        };
        this._onAddSignature = () => {
            const activeIds = mailspring_exports_1.FocusedPerspectiveStore.current().accountIds || mailspring_exports_1.AccountStore.accountIds();
            const activeAccount = mailspring_exports_1.AccountStore.accountForId(activeIds[0]);
            const id = mailspring_exports_1.Utils.generateTempId();
            let data = {};
            let body = null;
            if (this.state.selectedSignature) {
                data = Object.assign({}, this.state.selectedSignature.data);
                body = this.state.selectedSignature.body;
            }
            else {
                data = {
                    templateName: templates_1.default[0].name,
                    name: activeAccount.name,
                    email: activeAccount.emailAddress,
                };
                body = (0, constants_1.RenderSignatureData)(data);
            }
            mailspring_exports_1.Actions.upsertSignature({ id, title: (0, mailspring_exports_1.localized)('Untitled'), body, data }, id);
            mailspring_exports_1.Actions.selectSignature(id);
        };
        this._onDeleteSignature = signature => {
            mailspring_exports_1.Actions.removeSignature(signature);
        };
        this._onEditSignatureTitle = nextTitle => {
            const _a = this.state.selectedSignature, { title } = _a, rest = __rest(_a, ["title"]);
            mailspring_exports_1.Actions.upsertSignature(Object.assign({ title: nextTitle }, rest), rest.id);
        };
        this._onSelectSignature = sig => {
            mailspring_exports_1.Actions.selectSignature(sig.id);
        };
        this.state = this._getStateFromStores();
    }
    componentDidMount() {
        this.unsubscribers = [mailspring_exports_1.SignatureStore.listen(this._onChange)];
    }
    componentWillUnmount() {
        this.unsubscribers.forEach(unsubscribe => unsubscribe());
    }
    _getStateFromStores() {
        return {
            signatures: mailspring_exports_1.SignatureStore.getSignatures(),
            selectedSignature: mailspring_exports_1.SignatureStore.selectedSignature(),
            defaults: mailspring_exports_1.SignatureStore.getDefaults(),
            accountsAndAliases: mailspring_exports_1.AccountStore.aliases(),
        };
    }
    _renderSignatures() {
        const sigArr = Object.values(this.state.signatures);
        return (react_1.default.createElement(mailspring_component_kit_1.Flexbox, null,
            react_1.default.createElement(mailspring_component_kit_1.EditableList, { showEditIcon: true, className: "signature-list", items: sigArr, itemContent: sig => sig.title, onCreateItem: this._onAddSignature, onDeleteItem: this._onDeleteSignature, onItemEdited: this._onEditSignatureTitle, onSelectItem: this._onSelectSignature, selected: this.state.selectedSignature }),
            react_1.default.createElement(SignatureEditor, { signature: this.state.selectedSignature, defaults: this.state.defaults, accountsAndAliases: this.state.accountsAndAliases })));
    }
    render() {
        return (react_1.default.createElement("div", { className: "preferences-signatures-container" },
            react_1.default.createElement("section", null, this._renderSignatures())));
    }
}
exports.default = PreferencesSignatures;
PreferencesSignatures.displayName = 'PreferencesPlaintextSignatures';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZXMtc2lnbmF0dXJlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcmVmZXJlbmNlcy1zaWduYXR1cmVzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLGtEQUEwQjtBQUMxQiwyREFZNEI7QUFDNUIsdUVBQWlFO0FBRWpFLDJDQUFtRjtBQUNuRiwwR0FBK0U7QUFDL0UsNEZBQWtFO0FBQ2xFLDREQUFvQztBQVVwQyxNQUFNLGVBQWdCLFNBQVEsZUFBSyxDQUFDLFNBQXFEO0lBQXpGOztRQUNFLG1CQUFjLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDakMsNEJBQU8sQ0FBQyxlQUFlLGlDQUFNLEdBQUcsS0FBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQztRQUVGLHFCQUFnQixHQUFHLEtBQUssRUFBQyxLQUFLLEVBQUMsRUFBRTtZQUMvQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNqQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUM5QixJQUFJO2dCQUNGLElBQUksR0FBRyxNQUFNLDJDQUFzQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQztZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU87YUFDUjtZQUNELDRCQUFPLENBQUMsZUFBZSxpQ0FBTSxHQUFHLEtBQUUsSUFBSSxLQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUM7UUFFRix1QkFBa0IsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUMzQixNQUFNLEVBQUUsRUFBRSxFQUFF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