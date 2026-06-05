import { Component, type ReactNode } from "react";
import styles from "./Layout.module.css";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false, error: null };

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className={styles.errorBoundary}>
					<h2 className={styles.errorBoundaryTitle}>Something went wrong</h2>
					<p className={styles.errorBoundaryMessage}>
						{this.state.error?.message ?? "Unexpected error"}
					</p>
					<button
						className={styles.errorBoundaryButton}
						type="button"
						onClick={() => window.location.reload()}
					>
						Reload page
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}
