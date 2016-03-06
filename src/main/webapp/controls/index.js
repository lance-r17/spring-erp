import { Icon, Icons, WrapIcon, WrapIcons } from './icon.jsx';
import { Buttons, ScrollTopButton } from './button.jsx';
import { Label, RoleLabel, RoleLabels, RoleShortNameLabels } from './label.jsx';
import { MenuItemLink, SubMenu } from './menu.jsx';
import FormControls from './form.jsx';
import BootstrapControls from './bootstrap.jsx';
import Paging from './paging.jsx';
import NanoScroller from './scroll.jsx';

// tag::controls[]
var Controls = {};
_.extend(Controls, 
	{
		Icon,
		Icons,
		WrapIcon,
		WrapIcons,
		Buttons,
		ScrollTopButton,
		// Label,
		RoleLabel,
		RoleLabels,
		RoleShortNameLabels,
		//MenuItemLink,
		SubMenu
	},
	// tag::formsy[]
	FormControls,
	// end::formsy
	// tag::bootstrap[]
	BootstrapControls,
	// end::bootstrap[]
	// tag::paging
	{ Paging },
	// end::paging
	// tag::scroll
	{ NanoScroller }
	// end::scroll
);

module.exports = Controls;
module.exports.Controls = Controls;

// end::controls[]
