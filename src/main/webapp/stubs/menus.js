const SimpleMenu = [
	{
		header: 'Navigation',
		links: [
			{
				name: 'Dashboard',
				href: '/dashboard',
				fa: 'dashboard',
				label: {
                    content: 'Top',
					bsStyle: 'success',
					pullRight: true
				}
			}
		]
	},
	{
		header: 'Admin',
		links: [
			{
				name: 'Users',
				href: '/users',
				fa: 'users'
			}
		]
	},
	{
		header: 'Development',
		links: [
			{
				collapse: {
                    name: 'Toolkits',
                    fa: 'briefcase',
                    links: [
                        {
                            name: 'Page',
                            href: '/page',
                            label: {
                                content: 'new',
                                bsStyle: 'primary',
                                pullRight: true
                            }
                        },
                        {
                            name: 'Menu',
                            href: '/menu'
                        }
                    ]
                }
			}
		]
	}
];

export { SimpleMenu }
