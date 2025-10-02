"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type React from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import {
    IconSend,
} from "@tabler/icons-react";
import { useRef, useState } from "react";

export default function Chat() {
    const { messages, sendMessage, status, error } = useChat({
        transport: new DefaultChatTransport({
            api: '/ai',
        }),
    });
    const [message, setMessage] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (message.trim()) {
            sendMessage({ text: message })
            setMessage("");
            setIsExpanded(false);

            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }

        setIsExpanded(e.target.value.length > 100 || e.target.value.includes("\n"));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    return (
        <div className="w-full">

            {messages.map(m => (
                <li key={m.id} className="whitespace-pre-wrap">
                    <strong>{m.role}:</strong>{" "}
                    {m.parts.map((p, i) => (p.type === "text" ? <span key={i}>{p.text}</span> : null))}
                </li>
            ))}

            <form onSubmit={handleSubmit} className="group/composer w-full">
                <div
                    className={cn(
                        "w-full max-w-2xl mx-auto bg-transparent dark:bg-muted/50 cursor-text overflow-clip bg-clip-padding p-2.5 shadow-lg border border-border transition-all duration-200",
                        {
                            "rounded-3xl grid grid-cols-1 grid-rows-[auto_1fr_auto]":
                                isExpanded,
                            "rounded-[28px] grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto]":
                                !isExpanded,
                        }
                    )}
                    style={{
                        gridTemplateAreas: isExpanded
                            ? "'header' 'primary' 'footer'"
                            : "'header header header' 'leading primary trailing' '. footer .'",
                    }}
                >
                    <div
                        className={cn(
                            "flex min-h-14 items-center overflow-x-hidden px-1.5",
                            {
                                "px-2 py-1 mb-0": isExpanded,
                                "-my-2.5": !isExpanded,
                            }
                        )}
                        style={{ gridArea: "primary" }}
                    >
                        <div className="flex-1 overflow-auto max-h-52">
                            <Textarea
                                ref={textareaRef}
                                value={message}
                                onChange={handleTextareaChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask and ye shall receive, Master"
                                className="min-h-0 resize-none rounded-none border-0 p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 scrollbar-thin dark:bg-transparent"
                                rows={1}
                            />
                        </div>
                    </div>
                    {/* why doesn't this button render? also throws no error but still */}
                    {/* <div
                        className="flex items-center gap-2"
                        style={{ gridArea: isExpanded ? "footer" : "trailing" }}
                    >
                        <div className="ms-auto flex items-center gap-1.5">
                            {message.trim() && (
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="h-9 w-9 rounded-full"
                                >
                                    <IconSend className="size-5" />
                                </Button>
                            )}
                        </div>
                    </div> */}
                </div>
            </form>
        </div>
    );
}