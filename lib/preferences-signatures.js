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
                    sig.body = sig.data;
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
        const resolvedData = ResolveSignatureData(data);
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
                body = RenderSignatureData(data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZXMtc2lnbmF0dXJlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wcmVmZXJlbmNlcy1zaWduYXR1cmVzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLGtEQUEwQjtBQUMxQiwyREFZNEI7QUFDNUIsdUVBQWlFO0FBRWpFLDBHQUErRTtBQUMvRSw0RkFBa0U7QUFDbEUsNERBQW9DO0FBVXBDLE1BQU0sZUFBZ0IsU0FBUSxlQUFLLENBQUMsU0FBcUQ7SUFBekY7O1FBQ0UsbUJBQWMsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUN2QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNqQyw0QkFBTyxDQUFDLGVBQWUsaUNBQU0sR0FBRyxLQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDO1FBRUYscUJBQWdCLEdBQUcsS0FBSyxFQUFDLEtBQUssRUFBQyxFQUFFO1lBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ2pDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzlCLElBQUk7Z0JBQ0YsSUFBSSxHQUFHLE1BQU0sMkNBQXNCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTzthQUNSO1lBQ0QsNEJBQU8sQ0FBQyxlQUFlLGlDQUFNLEdBQUcsS0FBRSxJQUFJLEtBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQztRQUVGLHVCQUFrQixHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdB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