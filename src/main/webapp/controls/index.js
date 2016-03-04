import { Icon, Icons, WrapIcon, WrapIcons } from './icon.jsx';
import { Buttons, ScrollTopButton } from './button.jsx';
import Badge from './badge.jsx';
import { Label, RoleLabel, RoleLabels, RoleShortNameLabels } from './label.jsx';
import { MenuItemLink, SubMenu } from './menu.jsx';
import { FormStatic, FormInput, FormCheckboxGroup, ImageSelect } from './form.jsx';
import { Button, Modal, Alert, PanelAlert } from './bootstrap.jsx';
import Paging from './paging.jsx';
import NanoScroller from './scroll.jsx';

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
	ImageSelect,
	// end::formsy
	// tag::bootstrap[]
	Button,
	Modal, 
	Alert,
	PanelAlert,
	// end::bootstrap[]
	// tag::paging
	Paging,
	// end::paging
	// tag::scroll
	NanoScroller
	// end::scroll
}

module.exports = Controls;
module.exports.Controls = Controls;

// end::controls[]
