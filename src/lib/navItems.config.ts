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
                title: "Hosts",
                href: "/admin/dashboard/hosts-management",
                icon: "Stethoscope", 
                roles: ["ADMIN"],
            },
            {
                title: "USERs",
                href: "/admin/dashboard/users-management",
                icon: "Users", 
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Event Management",
        items: [
            {
                title: "Events",
                href: "/admin/dashboard/events-management",
                icon: "Calendar", 
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
                title: "Events",
                href: "/host/dashboard/events",
                icon: "Calendar", 
                badge: "3",
                roles: ["HOST"],
            },
            {
                title: "My Hosted Events",
                href: "/doctor/dashboard/my-events",
                icon: "Clock", 
                roles: ["HOST"],
            },
            {
                title: "Payments",
                href: "/doctor/dashboard/my-payments",
                icon: "FileText", 
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
                title: "Payments",
                href: "/dashboard/payments",
                icon: "ClipboardList", 
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