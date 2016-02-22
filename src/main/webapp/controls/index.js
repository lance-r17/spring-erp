import { Icon, Icons, WrapIcon, WrapIcons } from './icon.jsx';
import { Buttons, ScrollTopButton } from './button.jsx';
import Badge from './badge.jsx';
import { Label, RoleLabels, RoleShortNameLabels } from './label.jsx';
import { MenuItemLink, SubMenu } from './menu.jsx';

// tag::controls[]
var Controls = {};

Controls.Icon = Icon;
Controls.Icons = Icons;
Controls.WrapIcon = WrapIcon;
Controls.WrapIcons = WrapIcons;
Controls.Buttons = Buttons;
Controls.ScrollTopButton = ScrollTopButton;
Controls.Badge = Badge;
Controls.Label = Label;
Controls.RoleLabels = RoleLabels;
Controls.RoleShortNameLabels = RoleShortNameLabels;
Controls.MenuItemLink = MenuItemLink;
Controls.SubMenu = SubMenu;

module.exports = Controls;
module.exports.Controls = Controls;

// end::controls[]
