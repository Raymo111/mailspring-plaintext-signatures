"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mailspring_exports_1 = require("mailspring-exports");
const mailspring_component_kit_1 = require("mailspring-component-kit");
class SignatureAccountDefaultPicker extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this._onToggleAccount = account => {
            mailspring_exports_1.Actions.toggleAccount(account.email);
        };
    }
    render() {
        const { accountsAndAliases, defaults, signature } = this.props;
        const isChecked = accountOrAlias => defaults[accountOrAlias.email] === signature.id;
        const checked = accountsAndAliases.filter(isChecked);
        const noun = checked.length === 1 ? (0, mailspring_exports_1.localized)('Account') : (0, mailspring_exports_1.localized)('Accounts');
        return (react_1.default.createElement("div", { className: "account-picker" },
            (0, mailspring_exports_1.localized)('Default for:'),
            ' ',
            react_1.default.createElement(mailspring_component_kit_1.MultiselectDropdown, { className: "account-dropdown", items: accountsAndAliases, itemChecked: isChecked, itemContent: accountOrAlias => accountOrAlias.email, itemKey: a => a.id, attachment: 'right', buttonText: `${checked.length} ${noun}`, onToggleItem: this._onToggleAccount })));
    }
}
exports.default = SignatureAccountDefaultPicker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLWFjY291bnQtZGVmYXVsdC1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2lnbmF0dXJlLWFjY291bnQtZGVmYXVsdC1waWNrZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLDJEQU80QjtBQUM1Qix1RUFBK0Q7QUFRL0QsTUFBcUIsNkJBQThCLFNBQVEsZUFBSyxDQUFDLFNBRWhFO0lBRkQ7O1FBR0UscUJBQWdCLEdBQUcsT0FBTyxDQUFDLEVBQUU7WUFDM0IsNEJBQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztJQTBCSixDQUFDO0lBeEJDLE1BQU07UUFDSixNQUFNLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFL0QsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDcEYsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXJELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFBLDhCQUFTLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUEsOEJBQVMsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUVqRixPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFDLGdCQUFnQjtZQUM1QixJQUFBLDhCQUFTLEVBQUMsY0FBYyxDQUFDO1lBQUUsR0FBRztZQUMvQiw4QkFBQyw4Q0FBbUIsSUFDbEIsU0FBUyxFQUFDLGtCQUFrQixFQUM1QixLQUFLLEVBQUUsa0JBQWtCLEVBQ3pCLFdBQVcsRUFBRSxTQUFTLEVBQ3RCLFdBQVcsRUFBRSxjQUFjLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQ25ELE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ2xCLFVBQVUsRUFBRSxPQUFPLEVBQ25CLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFLEVBQ3ZDLFlBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEdBQ25DLENBQ0UsQ0FDUCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBL0JELGdEQStCQyJ9