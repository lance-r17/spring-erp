const FullMenu = [
	{
		header: {
			name: 'Navigation'
		}
	},
	{
		link: {
			name: 'Dashboard',
			href: '/dashboard',
			active: true,
			icon: {
				name: 'dashboard'
			},
			label: {
				color: 'success',
				content: 'Top'
			}
		}
	},
	{
		level: {
			name: 'Layouts',
			icon: {
				name: 'th'
			},
			subMenu: [
				{
					link: {
						name: 'Collapsed Navigation',
						href: '#'
					}
				},
				{
					link: {
						name: 'Off-Canvas Navigation',
						href: '#'
					}
				},
				{
					link: {
						name: 'Slide-in Navigation',
						href: '#'
					}
				},
				{
					link: {
						name: 'Revealing Navigation',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					link: {
						name: 'Aside on the right side',
						href: '#'
					}
				},
				{
					link: {
						name: 'Aside on the left side',
						href: '#'
					}
				},
				{
					link: {
						name: 'Bright aside theme',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					link: {
						name: 'Fixed Navbar',
						href: '#'
					}
				},
				{
					link: {
						name: 'Fixed Footer',
						href: '#'
					}
				}
			]
		}
	},
	{
		link: {
			name: 'Employees',
			href: '/employees',
			icon: {
				name: 'users'
			},
			badge: {
				content: '9',
				color: 'warning'
			}
		}
	},
	{
		divider: {}
	},
	{
		header: {
			name: 'Components'
		}
	},
	{
		level: {
			name: 'UI Elements',
			icon: {
				name: 'briefcase'
			},
			subMenu: [
				{
					link: {
						name: 'Buttons',
						href: '#'
					}
				},
				{
					link: {
						name: 'Checkboxes & Radio',
						href: '#'
					}
				},
				{
					link: {
						name: 'Panels',
						href: '#'
					}
				},
				{
					link: {
						name: 'Modals',
						href: '#'
					}
				},
				{
					link: {
						name: 'Progress bars',
						href: '#'
					}
				},
				{
					link: {
						name: 'Components',
						href: '#'
					}
				},
				{
					link: {
						name: 'Typography',
						href: '#'
					}
				},
				{
					link: {
						name: 'List Group',
						href: '#'
					}
				},
				{
					link: {
						name: 'Tabs & Accordions',
						href: '#'
					}
				},
				{
					link: {
						name: 'Alerts & Tooltips',
						href: '#'
					}
				},
				{
					link: {
						name: 'Helper Classes',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Forms',
			icon: {
				name: 'edit'
			},
			subMenu: [
				{
					link: {
						name: 'General',
						href: '#'
					}
				},
				{
					link: {
						name: 'Components',
						href: '#'
					}
				},
				{
					link: {
						name: 'Validation',
						href: '#'
					}
				},
				{
					link: {
						name: 'Wizard',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Tables',
			icon: {
				name: 'table'
			},
			subMenu: [
				{
					link: {
						name: 'Static Tables',
						href: '#'
					}
				},
				{
					link: {
						name: 'Bootstrap Tables',
						href: '#'
					}
				},
				{
					link: {
						name: 'Data Tables',
						href: '#',
						lable: {
							content: 'New',
							color: 'info'
						}
					}
				},
				{
					link: {
						name: 'Foo Tables',
						href: '#',
						lable: {
							content: 'New',
							color: 'info'
						}
					}
				}
			]
		}
	},
	{
		link: {
			name: 'Charts',
			href: '#',
			icon: {
				name: 'line-chart'
			}
		}
	},
	{
		divider: {}
	},
	{
		header: {
			name: 'Extra'
		}
	},
	{
		level: {
			name: 'Miscellaneous',
			label: {
				content: 'New',
				color: 'mint'
			},
			icon: {
				name: 'plug'
			},
			subMenu: [
				{
					link: {
						name: 'Calendar',
						href: '#'
					}
				},
				{
					link: {
						name: 'Google Map',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Email',
			icon: {
				name: 'envelope'
			},
			subMenu: [
				{
					link: {
						name: 'Inbox',
						href: '#'
					}
				},
				{
					link: {
						name: 'View Message',
						href: '#'
					}
				},
				{
					link: {
						name: 'Compose Message',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Pages',
			icon: {
				name: 'file'
			},
			subMenu: [
				{
					link: {
						name: 'Blank Page',
						href: '#'
					}
				},
				{
					link: {
						name: 'Profile',
						href: '#'
					}
				},
				{
					link: {
						name: 'Search Results',
						href: '#'
					}
				},
				{
					link: {
						name: 'Timeline',
						href: '#',
						label: {
							content: 'New',
							color: 'info'
						}
					}
				},
				{
					link: {
						name: 'FAQ',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					link: {
						name: '404 Error',
						href: '#'
					}
				},
				{
					link: {
						name: '500 Error',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					link: {
						name: 'Login',
						href: '#'
					}
				},
				{
					link: {
						name: 'Register',
						href: '#'
					}
				},
				{
					link: {
						name: 'Password Reminder',
						href: '#'
					}
				},
				{
					link: {
						name: 'Lock Screen',
						href: '#'
					}
				}
			]
		}
	},
	{
		level: {
			name: 'Menu Level',
			icon: {
				name: 'plus-square'
			},
			subMenu: [
				{
					link: {
						name: 'Second Level Item',
						href: '#'
					}
				},
				{
					link: {
						name: 'Second Level Item',
						href: '#'
					}
				},
				{
					link: {
						name: 'Second Level Item',
						href: '#'
					}
				},
				{
					divider: {}
				},
				{
					level: {
						name: 'Third Level',
						subMenu: [
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							}
						]
					}
				},
				{
					level: {
						name: 'Third Level',
						subMenu: [
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								divider: {}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							},
							{
								link: {
									name: 'Third Level Item',
									href: '#'
								}
							}
						]
					}
				}
			]
		}
	}
];

const SimpleMenu = [
	{
		header: {
			name: 'Navigation'
		}
	},
	{
		link: {
			name: 'Dashboard',
			href: '#',
			active: true,
			icon: {
				name: 'dashboard'
			},
			label: {
				color: 'success',
				content: 'Top'
			}
		}
	},
	{
		divider: {}
	},
	{
		header: {
			name: 'Administration'
		}
	},
	{
		link: {
			name: 'Employees',
			href: '/employees',
			icon: {
				name: 'users'
			}
		}
	}
];

var menus = {}
menus.FullMenu = FullMenu;
menus.SimpleMenu = SimpleMenu;

module.exports = menus;