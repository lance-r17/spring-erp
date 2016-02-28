import { Icon, Icons, WrapIcon, WrapIcons } from './icon.jsx';
import { Buttons, ScrollTopButton } from './button.jsx';
import Badge from './badge.jsx';
import { Label, RoleLabel, RoleLabels, RoleShortNameLabels } from './label.jsx';
import { MenuItemLink, SubMenu } from './menu.jsx';
import { FormStatic, FormInput, FormCheckboxGroup } from './form.jsx';
import { Modal, Alert, PanelAlert } from './bootstrap.jsx';
import Paging from './paging.jsx';

// tag::controls[]
var Controls = {
	Icon,
	Icons,
	WrapIcon,
	WrapIcons,
	Buttons,
	ScrollTopButton,
	Badge,
	Label,
	RoleLabel,
	RoleLabels,
	RoleShortNameLabels,
	MenuItemLink,
	SubMenu,
	// tag::formsy[]
	Formsy,
	FormStatic,
	FormInput,
	FormCheckboxGroup,
	// end::formsy
	// tag::bootstrap[]
	Modal, 
	Alert,
	PanelAlert,
	// end::bootstrap[]
	// tag::paging
	Paging
	// end::paging
}

module.exports = Controls;
module.exports.Controls = Controls;

// end::controls[]
