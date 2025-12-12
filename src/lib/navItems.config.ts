import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "HOST", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "HOST", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings",
                    roles: ["USER", "HOST", "ADMIN"],
                },
            ],
        },
    ]
}



// admin nav items
export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Hosts Management",
                href: "/admin/dashboard/hosts-management",
                icon: "Users", 
                roles: ["ADMIN"],
            },
            {
                title: "Users Management",
                href: "/admin/dashboard/users-management",
                icon: "Users", 
                roles: ["ADMIN"],
            },
              {
                title: "Host Applications",
                href: "/admin/dashboard/host-applications",
                icon: "Users", 
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Event Management",
        items: [
            {
                title: "Event Types",
                href: "/admin/dashboard/event-type-management",
                icon: "Calendar", 
                roles: ["ADMIN"],
            },
            {
                title: "Events",
                href: "/admin/dashboard/events-management",
                icon: "CalendarCog", 
                roles: ["ADMIN"],
            },
        ],
    }
]

// host nav items
export const hostNavItems: NavSection[] = [
    {
        title: "Event Management",
        items: [
            {
                title: "Create Event",
                href: "/events/create",
                icon: "Plus", 
                roles: ["HOST"],
            },
            {
                title: "My Hosted Events",
                href: "/host/dashboard/hosted-events",
                icon: "CalendarCog", 
                roles: ["HOST"],
            },
            {
                title: "Revenue",
                href: "/host/dashboard/my-revenues",
                icon: "FileText", 
                roles: ["HOST"],
            },
             {
                title: "Participants Manage",
                href: "/host/dashboard/participants-management",
                icon: "Users", 
                roles: ["HOST"],
            },
        ],
    }
]



// user nav items
export const userNavItems: NavSection[] = [
    {
        title: "Events Management",
        items: [
            {
                title: "My Events",
                href: "/dashboard/my-events",
                icon: "Calendar", 
                roles: ["USER"],
            },
            {
                title: "Saved Events",
                href: "/dashboard/saved-events",
                icon: "Bookmark", 
                roles: ["USER"],
            },
            // {
            //     title: "Payments",
            //     href: "/dashboard/payments",
            //     icon: "ClipboardList", 
            //     roles: ["USER"],
            // },
        ],
    },
    {
        title: "Social",
        items: [
            {
                title: "Friends",
                href: "/dashboard/friends",
                icon: "Users", 
                roles: ["USER"],
            },
            {
                title: "Friends' Events",
                href: "/dashboard/friends-events",
                icon: "Calendar", 
                roles: ["USER"],
            },
        ],
    },

]



export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "HOST":
            return [...commonNavItems, ...hostNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
}