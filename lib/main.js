"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = exports.deactivate = exports.activate = void 0;
const mailspring_exports_1 = require("mailspring-exports");
const signature_composer_extension_1 = __importDefault(require("./signature-composer-extension"));
const signature_composer_dropdown_1 = __importDefault(require("./signature-composer-dropdown"));
function activate() {
    this.preferencesTab = new mailspring_exports_1.PreferencesUIStore.TabItem({
        tabId: 'PlaintextSignatures',
        displayName: (0, mailspring_exports_1.localized)('Plain-text Signatures'),
        componentClassFn: () => require('./preferences-signatures').default, // eslint-disable-line
    });
    mailspring_exports_1.ExtensionRegistry.Composer.register(signature_composer_extension_1.default);
    mailspring_exports_1.PreferencesUIStore.registerPreferencesTab(this.preferencesTab);
    mailspring_exports_1.ComponentRegistry.register(signature_composer_dropdown_1.default, {
        role: 'Composer:FromFieldComponents',
    });
}
exports.activate = activate;
function deactivate() {
    mailspring_exports_1.ExtensionRegistry.Composer.unregister(signature_composer_extension_1.default);
    mailspring_exports_1.PreferencesUIStore.unregisterPreferencesTab(this.preferencesTab.sectionId);
    mailspring_exports_1.ComponentRegistry.unregister(signature_composer_dropdown_1.default);
}
exports.deactivate = deactivate;
function serialize() {
    return {};
}
exports.serialize = serialize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJEQUs0QjtBQUU1QixrR0FBd0U7QUFDeEUsZ0dBQXNFO0FBRXRFLFNBQWdCLFFBQVE7SUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHVDQUFrQixDQUFDLE9BQU8sQ0FBQztRQUNuRCxLQUFLLEVBQUUscUJBQXFCO1FBQzVCLFdBQVcsRUFBRSxJQUFBLDhCQUFTLEVBQUMsdUJBQXVCLENBQUM7UUFDL0MsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUMsT0FBTyxFQUFFLHNCQUFzQjtLQUM1RixDQUFDLENBQUM7SUFFSCxzQ0FBaUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNDQUEwQixDQUFDLENBQUM7SUFDaEUsdUNBQWtCLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRS9ELHNDQUFpQixDQUFDLFFBQVEsQ0FBQyxxQ0FBeUIsRUFBRTtRQUNwRCxJQUFJLEVBQUUsOEJBQThCO0tBQ3JDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFiRCw0QkFhQztBQUVELFNBQWdCLFVBQVU7SUFDeEIsc0NBQWlCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxzQ0FBMEIsQ0FBQyxDQUFDO0lBQ2xFLHVDQUFrQixDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFM0Usc0NBQWlCLENBQUMsVUFBVSxDQUFDLHFDQUF5QixDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUxELGdDQUtDO0FBRUQsU0FBZ0IsU0FBUztJQUN2QixPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFGRCw4QkFFQyJ9