"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mailspring_exports_1 = require("mailspring-exports");
const templates_1 = __importDefault(require("./templates"));
class SignatureTemplatePicker extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this._onClickItem = event => {
            const value = event.currentTarget.dataset.value;
            this.props.onChange({ target: { id: 'templateName', value } });
        };
    }
    componentDidMount() {
        this.ensureSelectionVisible();
    }
    componentDidUpdate() {
        this.ensureSelectionVisible();
    }
    ensureSelectionVisible() {
        const item = this._el.querySelector('.active');
        if (item) {
            const left = item.offsetLeft - 5;
            const right = item.offsetLeft + item.clientWidth + 5;
            if (left < this._el.scrollLeft) {
                this._el.scrollLeft = left;
            }
            else if (right > this._el.scrollLeft + this._el.clientWidth) {
                this._el.scrollLeft = right - this._el.clientWidth;
            }
        }
    }
    render() {
        let { resolvedData } = this.props;
        const { name, email, title } = resolvedData;
        if (!name && !email && !title) {
            resolvedData = Object.assign(Object.assign({}, resolvedData), { name: (0, mailspring_exports_1.localized)('Your name'), email: 'you@domain.com', title: (0, mailspring_exports_1.localized)('Job Title') });
        }
        return (react_1.default.createElement("div", { ref: el => (this._el = el), className: "signature-template-picker" },
            templates_1.default.map((t, idx) => (react_1.default.createElement("div", { key: idx, "data-value": t.name, className: `option ${t.name === resolvedData.templateName && 'active'}`, onClick: this._onClickItem },
                react_1.default.createElement("div", { className: "centered" },
                    react_1.default.createElement("div", { className: "preview" }, t(resolvedData)))))),
            react_1.default.createElement("div", { "data-value": null, className: `option ${!resolvedData.templateName && 'active'}`, onClick: this._onClickItem },
                react_1.default.createElement("div", { className: "centered" }, (0, mailspring_exports_1.localized)('Plain-text Signature')))));
    }
}
exports.default = SignatureTemplatePicker;
SignatureTemplatePicker.propTypes = {
    resolvedData: mailspring_exports_1.PropTypes.object,
    onChange: mailspring_exports_1.PropTypes.func,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLXRlbXBsYXRlLXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zaWduYXR1cmUtdGVtcGxhdGUtcGlja2VyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQiwyREFBMEQ7QUFDMUQsNERBQW9DO0FBRXBDLE1BQXFCLHVCQUF3QixTQUFRLGVBQUssQ0FBQyxTQUd6RDtJQUhGOztRQVdFLGlCQUFZLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDO0lBNERKLENBQUM7SUExREMsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBZ0IsQ0FBQztRQUM5RCxJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFFckQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUM1QjtpQkFBTSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtnQkFDN0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO2FBQ3BEO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRWxDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLFlBQVksQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzdCLFlBQVksbUNBQ1AsWUFBWSxLQUNmLElBQUksRUFBRSxJQUFBLDhCQUFTLEVBQUMsV0FBVyxDQUFDLEVBQzVCLEtBQUssRUFBRSxnQkFBZ0IsRUFDdkIsS0FBSyxFQUFFLElBQUEsOEJBQVMsRUFBQyxXQUFXLENBQUMsR0FDOUIsQ0FBQztTQUNIO1FBQ0QsT0FBTyxDQUNMLHVDQUFLLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUMsMkJBQTJCO1lBQ25FLG1CQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDekIsdUNBQ0UsR0FBRyxFQUFFLEdBQUcsZ0JBQ0ksQ0FBQyxDQUFDLElBQUksRUFDbEIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsWUFBWSxJQUFJLFFBQVEsRUFBRSxFQUN2RSxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBRTFCLHVDQUFLLFNBQVMsRUFBQyxVQUFVO29CQUN2Qix1Q0FBSyxTQUFTLEVBQUMsU0FBUyxJQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBTyxDQUM1QyxDQUNGLENBQ1AsQ0FBQztZQUNGLHFEQUNjLElBQUksRUFDaEIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxJQUFJLFFBQVEsRUFBRSxFQUM3RCxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBRTFCLHVDQUFLLFNBQVMsRUFBQyxVQUFVLElBQUUsSUFBQSw4QkFBUyxFQUFDLHNCQUFzQixDQUFDLENBQU8sQ0FDL0QsQ0FDRixDQUNQLENBQUM7SUFDSixDQUFDOztBQXpFSCwwQ0EwRUM7QUF0RVEsaUNBQVMsR0FBRztJQUNqQixZQUFZLEVBQUUsOEJBQVMsQ0FBQyxNQUFNO0lBQzlCLFFBQVEsRUFBRSw4QkFBUyxDQUFDLElBQUk7Q0FDekIsQ0FBQyJ9