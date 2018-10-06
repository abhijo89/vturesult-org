import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
// Loading models 
import { User } from "./models/user.model";

@Component({
	selector: "app-login",
	moduleId: module.id,
	templateUrl: "./login.component.html",
	styleUrls: ['./login.component.css']
})
export class LoginComponent {	
	isLoggingIn = true;
	user: User;
	processing = false;
	@ViewChild("password") password: ElementRef;
	@ViewChild("confirmPassword") confirmPassword: ElementRef;
	constructor(private page: Page, private router: Router) {
		this.page.actionBarHidden = true;
		this.user = new User();
		// this.user.email = "foo2@foo.com";
        // this.user.password = "foo";
        // this.processing = true;
		this.router.navigate(["/search"]);
	}
	alert(message: string) {
		return alert({
			title: "VTU Result Logn",
			okButtonText: "OK",
			message: message
		});
	}
	toggleForm() {
		this.isLoggingIn = !this.isLoggingIn;
	}
	focusConfirmPassword() {
		if (!this.isLoggingIn) {
			this.confirmPassword.nativeElement.focus();
		}
	}

	focusPassword() {
		this.password.nativeElement.focus();
	}

	register() {
		if (this.user.password != this.user.confirmPassword) {
			this.alert("Your passwords do not match.");
			return;
		}
	}
	forgotPassword() {
		prompt({
			title: "Forgot Password",
			message: "Enter the email address you used to register for APP NAME to reset your password.",
			inputType: "email",
			defaultText: "",
			okButtonText: "Ok",
			cancelButtonText: "Cancel"
		}).then((data) => {
			
		});
	}

	login() {
		this.processing = false;
		this.router.navigate(["/search"]);
	}

	submit() {
		if (!this.user.email || !this.user.password) {
			this.alert("Please provide both an email address and password.");
			return;
		}

		this.processing = true;
		if (this.isLoggingIn) {
			this.login();
		} else {
			this.register();
		}
	}
	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}
}

