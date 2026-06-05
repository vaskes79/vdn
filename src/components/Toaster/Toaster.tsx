import * as Toast from "@radix-ui/react-toast";
import { useToastStore } from "@store/useToastStore";
import styles from "./Toaster.module.css";

export const Toaster = () => {
	const { toasts, remove } = useToastStore();

	return (
		<Toast.Provider swipeDirection="right" duration={3000}>
			{toasts.map((toast) => (
				<Toast.Root
					key={toast.id}
					className={styles.root}
					data-type={toast.type}
					open
					onOpenChange={(open) => {
						if (!open) remove(toast.id);
					}}
				>
					<Toast.Description>{toast.message}</Toast.Description>
				</Toast.Root>
			))}
			<Toast.Viewport className={styles.viewport} />
		</Toast.Provider>
	);
};
