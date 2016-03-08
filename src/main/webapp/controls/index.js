import { Label, RoleLabel, RoleLabels, RoleShortNameLabels } from './label.jsx';
import FormControls from './form.jsx';
import BootstrapControls from './bootstrap.jsx';
import Paging from './paging.jsx';
import NanoScroller from './scroll.jsx';

// tag::controls[]
var Controls = {};
_.extend(Controls, 
	{
		// Label,
		RoleLabel,
		RoleLabels,
		RoleShortNameLabels
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
