import React, { useState, useRef, useEffect, useCallback } from "react";
import { TableData } from "../util/TableData";
import { FROZEN_COLUMNS } from "../util/contants";

interface VirtualizedListProps {
    itemHeight: number; // Height of each item in pixels
    viewportHeight: number; // Height of the viewport in pixels
    items: TableData[]; // Array of items to display
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({
    itemHeight,
    viewportHeight,
    items,
}) => {
    // State to manage visible items and track the last loaded index
    const [visibleItems, setVisibleItems] = useState<TableData[]>([]);
    const [lastVisibleIndex, setLastVisibleIndex] = useState<number>(0);

    // Refs for the container and load more trigger
    const containerRef = useRef<HTMLDivElement | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Load additional items into view
    const loadItems = useCallback(() => {
        const newItems = items.slice(0, lastVisibleIndex + 10);
        setVisibleItems(() => newItems);
        setLastVisibleIndex((prevIndex) => prevIndex + 10);
    }, [lastVisibleIndex, items]);

    // Load initial items on component mount
    useEffect(() => {
        if (items.length) loadItems();
    }, [items, loadItems]);

    // Set up Intersection Observer for lazy loading items
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    lastVisibleIndex < items.length
                ) {
                    loadItems();
                }
            },
            {
                root: containerRef.current,
                rootMargin: "0px",
                threshold: 1.0,
            },
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        // Clean up observer on component unmount
        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [lastVisibleIndex, loadItems, items.length]);

    return (
        <div
            ref={containerRef}
            style={{
                height: viewportHeight,
                overflowY: "auto",
                position: "relative",
            }}>
            <div
                style={{
                    height: items.length * itemHeight,
                    position: "relative",
                }}>
                {visibleItems.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            height: itemHeight,
                            borderBottom: "1px solid #ccc",
                            padding: "0.5rem",
                        }}>
                        {JSON.stringify(item)}
                        <tr role='row'>
                            {Object.values(item).map((tableData, index) => (
                                <td
                                    className={
                                        index < FROZEN_COLUMNS
                                            ? "FixedColumn"
                                            : ""
                                    }
                                    style={{
                                        minWidth: 150,
                                        left:
                                            index < FROZEN_COLUMNS
                                                ? `${index * 150}px`
                                                : "auto",
                                    }}>
                                    {tableData}
                                </td>
                            ))}
                        </tr>
                    </div>
                ))}
                {/* Load more trigger */}
                <div ref={loadMoreRef} style={{ height: 1 }} />
            </div>
        </div>
    );
};

export default VirtualizedList;
