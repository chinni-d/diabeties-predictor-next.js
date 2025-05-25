"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Heart, Menu, Home, Activity, History, Info, Sparkles, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
	{ name: "Home", href: "/", icon: Home },
	{ name: "Predict", href: "/predict", icon: Activity },
	{ name: "History", href: "/history", icon: History },
	{ name: "About", href: "/about", icon: Info },
]

export function Navigation() {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	return (
		<header className="sticky top-0 z-50 w-full border-b border-blue-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm">
			<div className="container mx-auto px-4">
				{/* Main flex container for header content */}
				<div className="flex h-16 items-center justify-between">
					{/* Mobile: Nav menu left, logo center, SignIn right */}
					<div className="flex flex-1 items-center md:hidden">
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="text-blue-700 hover:bg-blue-50 hover:text-blue-900 rounded-xl transition-all duration-300"
								>
									<Menu className="h-6 w-6" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="w-80 bg-gradient-to-b from-white to-blue-50">
								<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
								<div className="flex items-center space-x-3 mb-8">
									<Heart className="h-8 w-8 text-blue-600" />
									<div>
										<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
											DiabetesAI
										</span>
									</div>
								</div>
								<nav className="flex flex-col space-y-3">
									{navigation.map((item) => {
										const Icon = item.icon
										const isActive = pathname === item.href
										return (
											<Link
												key={item.name}
												href={item.href}
												onClick={() => setIsOpen(false)}
												className={cn(
													"flex items-center space-x-3 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-300",
													isActive
														? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
														: "text-blue-700 hover:bg-blue-100 hover:text-blue-900",
												)}
											>
												<Icon className="h-5 w-5" />
												<span>{item.name}</span>
											</Link>
										)
									})}
								</nav>
							</SheetContent>
						</Sheet>
						<div className="flex-1 flex justify-center">
							<Link href="/" className="flex items-center space-x-3 group">
								<div className="relative">
									<Heart className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
									<Sparkles className="h-3 w-3 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
								</div>
								<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
									DiabetesAI
								</span>
							</Link>
						</div>
						{/* Sign In Button for Mobile (far right of this group) */}
						<div className="ml-auto">
							{/* Use ml-auto to push it to the right */}
							<Button variant="outline" size="sm" className="flex items-center">
								<span>Sign In</span> {/* Text only, removed responsive classes for icon */}
							</Button>
						</div>
					</div>

					{/* Desktop: Logo left, nav center, SignIn right */}
					<Link href="/" className="hidden md:flex items-center space-x-3 group">
						{/* Desktop Logo */}
						<div className="relative">
							<Heart className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
							<Sparkles className="h-4 w-4 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
						</div>
						<div>
							<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
								DiabetesAI
							</span>
						</div>
					</Link>
					{/* Desktop Nav - remove w-full, justify-center. Add mx-auto to keep it centered if space allows */}
					<nav className="hidden md:flex items-center space-x-2 mx-auto">
						{navigation.map((item) => {
							const Icon = item.icon
							const isActive = pathname === item.href
							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group",
										isActive
											? "bg-blue-100 text-blue-900"
											: "text-blue-700 hover:bg-blue-50 hover:text-blue-900",
									)}
								>
									<Icon className={cn("h-4 w-4 transition-transform duration-200", isActive && "scale-105")} />
									<span>{item.name}</span>
								</Link>
							)
						})}
					</nav>
					{/* Desktop Sign In Button */}
					<div className="hidden md:flex items-center">
						<Button variant="outline" size="sm" className="flex items-center">
							<LogIn className="mr-2 h-4 w-4" /> Sign In
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
