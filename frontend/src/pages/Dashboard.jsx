import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useBoard } from "@/context/BoardContext";
import { CheckCircle2, CircleDashed, Clock3, KanbanSquare } from "lucide-react";
import { Link } from "react-router-dom";

const getTasksFromIds = (ids, tasksMap) =>
    (ids || []).map((id) => tasksMap[id]).filter(Boolean);

export default function Dashboard() {
    const { user } = useAuth();
    const { boardState } = useBoard();

    const todoIds = boardState.columns?.todo?.taskIds || [];
    const inProgressIds = boardState.columns?.inprogress?.taskIds || [];
    const doneIds = boardState.columns?.done?.taskIds || [];

    const todoTasks = getTasksFromIds(todoIds, boardState.tasks);
    const inProgressTasks = getTasksFromIds(inProgressIds, boardState.tasks);
    const doneTasks = getTasksFromIds(doneIds, boardState.tasks);

    const total = todoTasks.length + inProgressTasks.length + doneTasks.length;
    const completionRate = total > 0 ? Math.round((doneTasks.length / total) * 100) : 0;

    const focusNow = inProgressTasks.slice(0, 3);
    const nextUp = todoTasks.slice(0, 3);

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <header className="space-y-1">
                <h1 className="text-3xl font-semibold tracking-tight">
                    Welcome back
                </h1>
                <p className="text-sm text-muted-foreground">
                    Quick snapshot of your current workflow.
                </p>
            </header>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Tasks</CardDescription>
                        <CardTitle className="text-2xl">{total}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                        Across all columns
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>To Do</CardDescription>
                        <CardTitle className="text-2xl">{todoTasks.length}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CircleDashed className="h-4 w-4" />
                        Not started
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>In Progress</CardDescription>
                        <CardTitle className="text-2xl">{inProgressTasks.length}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock3 className="h-4 w-4" />
                        Being worked on
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Done</CardDescription>
                        <CardTitle className="text-2xl">{doneTasks.length}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Completion</CardDescription>
                        <CardTitle className="text-2xl">{completionRate}%</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                        Done / Total
                    </CardContent>
                </Card>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Focus Now</CardTitle>
                        <CardDescription>Top tasks currently in progress.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {focusNow.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                No tasks in progress yet.
                            </p>
                        ) : (
                            focusNow.map((task) => (
                                <div key={task.id} className="rounded-lg border p-3">
                                    <p className="font-medium">{task.title}</p>
                                    {task.description ? (
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {task.description}
                                        </p>
                                    ) : null}
                                    {task.tags?.length ? (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {task.tags.map((tag) => (
                                                <span
                                                    key={task.id}
                                                    className="rounded border bg-amber-100 px-1.5 py-0.5 text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Next Up</CardTitle>
                        <CardDescription>Suggested tasks from your To Do list.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {nextUp.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                Your To Do column is empty.
                            </p>
                        ) : (
                            nextUp.map((task) => (
                                <div key={task.id} className="rounded-lg border p-3">
                                    <p className="font-medium">{task.title}</p>
                                    {task.description ? (
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {task.description}
                                        </p>
                                    ) : null}
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </section>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Jump to the pages you use most.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    <Button asChild>
                        <Link to="/board" className="inline-flex items-center gap-2">
                            <KanbanSquare className="h-4 w-4" />
                            Open Board
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link to="/account">Go to Account</Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link to="/settings">Open Settings</Link>
                    </Button>
                </CardContent>

                <Separator />

                <CardContent className="pt-4">
                    {total === 0 ? (
                        <div className="rounded-lg border border-dashed p-4 text-sm">
                            <p className="font-medium">No tasks yet.</p>
                            <p className="text-muted-foreground">
                                Create your first task from the board to start tracking progress.
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            You are tracking {total} task{total === 1 ? "" : "s"} right now.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}