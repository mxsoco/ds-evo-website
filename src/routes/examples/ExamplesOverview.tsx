import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toSentenceCase, fetchAllIssueCounts, fetchExampleMetadataFromProject } from "../../utils";
import {
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabCheckbox,
  GoabDataGrid,
  GoabDrawer,
  GoabFilterChip,
  GoabFormItem,
  GoabIcon,
  GoabInput,
  GoabLink,
  GoabMenuAction,
  GoabMenuButton,
  GoabSkeleton,
  GoabTab,
  GoabTabs,
  GoabTable,
  GoabTableSortHeader,
  GoabText,
  GoabTooltip,
} from "@abgov/react-components";
import {
    GoabMenuButtonOnActionDetail
} from "@abgov/ui-components-common";
import { useDebounce } from "use-debounce";
import {
  ExampleCard,
  ExampleCardProps as RawExampleProps,
  ComponentStatus
} from "../../components/example-card/ExampleCard";
import {useTwoLevelSort} from "../../hooks/useTwoLevelSort";
import {EmptyState} from "../../components/EmptyState";

type ExampleProps = Omit<RawExampleProps, "status"> & {
  status: ComponentStatus;
  designComponentFigmaUrl?: string;
  designContributionFigmaUrl?: string;
  openIssuesUrl?: string;
  metatags?: string[];
  url?: string;
  slug?: string;
  groups?: string[];
};

export default function ExamplesOverviewPage() {
  const [filter, setFilter] = useState<string>("");
  const [debouncedFilter] = useDebounce(filter, 300);
  const [issueCounts, setIssueCounts] = useState<Record<string, number>>({});
  const [cards, setCards] = useState<ExampleProps[]>([]);
  const [activeTab, setActiveTab] = useState('Cards');
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { sortConfig, clearSort, sortByKey, handleTableSort } = useTwoLevelSort();

  const [showFilters, setShowFilters] = useState(false);
  const sizes = ["Interaction", "Task", "Page", "Service"];
  const userGoals = ["Ask a user for...", "Help a user to..."];
  const categories = [
    "Content layout",
    "Feedback and alerts",
    "Inputs and actions",
    "Public form",
    "Structure and navigation",
    "Technical"
  ];
  const [selectedFilters, setSelectedFilters] = useState<{
    size: string[];
    userGoal: string[];
    category: string[];
  }>({
    size: [],
    userGoal: [],
    category: []
  });
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const tablet = width < 768;
      setIsMobile(tablet);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleCheckboxChange(category: "size" | "userGoal" | "category", value: string, checked: boolean) {
    setSelectedFilters((prev) => {
      const prevSet = new Set(prev[category]);
      if (checked) {
        prevSet.add(value);
      } else {
        prevSet.delete(value);
      }
      return { ...prev, [category]: Array.from(prevSet) };
    });
  }

  const filterChips = useMemo(() => {
    const chips: { category: keyof typeof selectedFilters; value: string; label: string }[] = [];
    selectedFilters.size.forEach(v => chips.push({
        category: 'size',
        value: v,
        label: v
    }));
    selectedFilters.userGoal.forEach(v => chips.push({
        category: 'userGoal',
        value: v,
        label: v
    }));
    selectedFilters.category.forEach(v => chips.push({
        category: 'category',
        value: v,
        label: v
    }));
    return chips;
  }, [selectedFilters]);

  const resetFilters = () => {
    setSelectedFilters({
      size: [],
      userGoal: [],
      category: []
    });
    setFilter("");
  };

  const removeAppliedFilter = (category: keyof typeof selectedFilters, value: string) => {
      setSelectedFilters(prev => ({
          ...prev,
          [category]: prev[category].filter(v => v !== value)
      }));
  };
  
  const handleTabChange = (event: any) => {
    const tabIndex = event.detail?.tab || event.tab;
    const tabMap = ['Cards', 'List'];
    setActiveTab(tabMap[tabIndex - 1] || 'Cards');
  };

  // Calculate if all or any filters are selected
  userGoals.every((p) => selectedFilters.userGoal.includes(p)) &&
  categories.every((t) => selectedFilters.category.includes(t));
  userGoals.some((p) => selectedFilters.userGoal.includes(p)) ||
  categories.some((t) => selectedFilters.category.includes(t));

  useEffect(() => {
    const fetchData = async () => {
      const metadata = await fetchExampleMetadataFromProject();
      const withSlugs = metadata.map((item) => ({
        ...item,
        slug: item.name
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      }));
      const sorted = withSlugs.sort((a, b) => {
        const statusOrder: ComponentStatus[] = ["Available", "In Progress", "Not Published"];
        const statusComparison =
          statusOrder.indexOf(a.status as ComponentStatus) - statusOrder.indexOf(b.status as ComponentStatus);
        if (statusComparison !== 0) return statusComparison;
        return a.name.localeCompare(b.name);
      });
      setCards(sorted);

      const issueCounts = await fetchAllIssueCounts("Examples", sorted);
      setIssueCounts(issueCounts);
    };
    fetchData();
  }, [selectedFilters]);

  const filteredCards = (() => {
    const search = debouncedFilter.toLowerCase();

    const matchesSearch = (card: ExampleProps) =>
      card.name.toLowerCase().includes(search) ||
      card.description.toLowerCase().includes(search) ||
      card.tags?.some((tag) => tag.toLowerCase().includes(search)) ||
      card.metatags?.some((tag) => tag.toLowerCase().includes(search));

    const safeIncludes = (tags: string[] | undefined, value: string) => (tags ?? []).includes(value);

    const strictMatch = (card: ExampleProps) => {
      const tags = card.tags ?? [];

      const sizeMatch =
        selectedFilters.size.length === 0 ||
        selectedFilters.size.every((sz) => safeIncludes(tags, sz));

      const userGoalMatch =
        selectedFilters.userGoal.length === 0 ||
        selectedFilters.userGoal.every((goal) => safeIncludes(tags, goal));

      const categoryMatch =
        selectedFilters.category.length === 0 ||
        selectedFilters.category.every((cat) => safeIncludes(tags, cat));

      return sizeMatch && userGoalMatch && categoryMatch && matchesSearch(card);
    };

    const looseMatch = (card: ExampleProps) => {
      const tags = card.tags ?? [];

      const sizeMatch =
        selectedFilters.size.length > 0 &&
        selectedFilters.size.some((sz) => safeIncludes(tags, sz));

      const userGoalMatch =
        selectedFilters.userGoal.length > 0 &&
        selectedFilters.userGoal.some((goal) => safeIncludes(tags, goal));

      const categoryMatch =
        selectedFilters.category.length > 0 &&
        selectedFilters.category.some((cat) => safeIncludes(tags, cat));

      return (sizeMatch || userGoalMatch || categoryMatch) && matchesSearch(card);
    };

    const strictFiltered = cards.filter(strictMatch);
    const looseFiltered = cards.filter((card) => looseMatch(card) && !strictMatch(card));

    const result = [...strictFiltered, ...looseFiltered];

    const sortBy = sortConfig.primary?.key ?? 'status';
    const newDirection = sortConfig.primary?.direction === 'asc' ? -1 : 1;

    const sortedFiltered = [...result].sort((a, b) => {
      if (sortBy === "status") {
        const statusOrder: ComponentStatus[] = ["Available", "In Progress", "Not Published"];
        const statusComparison =
          statusOrder.indexOf(a.status as ComponentStatus) - statusOrder.indexOf(b.status as ComponentStatus);
        if (statusComparison !== 0) return statusComparison * newDirection;
      }
      const key = sortBy as keyof ExampleProps;
      const aField = (a as any)[key];
      const bField = (b as any)[key];

      const aValue = sortBy === "name"
        ? a.name.toLowerCase()
        : Array.isArray(aField) ? (aField.length > 0 ? aField[0] : "") : (aField ?? "");
      const bValue = sortBy === "name"
        ? b.name.toLowerCase()
        : Array.isArray(bField) ? (bField.length > 0 ? bField[0] : "") : (bField ?? "");

      if (aValue > bValue) return newDirection;
      if (aValue < bValue) return -newDirection;
      return 0;
    });

    return sortedFiltered;
  })();

  // Get icon for sort menu item (checkmark when selected as primary with no secondary)
  const getSortIcon = (key: string): string | undefined => {
    if (sortConfig.primary?.key === key) return 'checkmark';
    if (sortConfig.secondary?.key === key) return 'checkmark';
    return undefined;
  };
  
  // Handle sort from MenuButton actions
  const handleSortAction = (action: string) => {
    if (action === 'clear-sort') {
      clearSort();
      return;
    }
    const key = action.replace('sort-', '');
    sortByKey(key);
  };

  // Get indicator for menu item
  const getSortIndicator = (key: string): string => {
    if (sortConfig.primary?.key === key) {
        const arrow = sortConfig.primary.direction === 'asc' ? '↑' : '↓';
        // Only show "1st" if there's also a secondary sort
        return sortConfig.secondary ? ` (1st ${arrow})` : ` ${arrow}`;
    }
    if (sortConfig.secondary?.key === key) {
        const arrow = sortConfig.secondary.direction === 'asc' ? '↑' : '↓';
        return ` (2nd ${arrow})`;
    }
    return '';
  };

  return (
    <div>
      <GoabBlock direction="column" gap="none" maxWidth="735px" width="100%">
        <GoabText size="heading-xl" mt="2xl" mb="m">
          Examples
        </GoabText>
        <GoabText size="body-l" mt="none" mb="xl">
          Common patterns, pages, tasks, component configurations, flows, and more to use as a starting point when
          creating government digital services.
        </GoabText>
        <GoabFormItem helpText="Search by keyword, category, or name">
          <GoabInput
            leadingIcon="search"
            name="filter"
            size="compact"
            type="text"
            value={filter}
            width="100%"
            onChange={({ value }) => setFilter(value || "")}
          />
        </GoabFormItem>
      </GoabBlock>

      <GoabBlock mt="2xl" gap="s">

        <GoabButton leadingIcon="filter" type="secondary" size="compact" mb="xl" onClick={() => setShowFilters((prev) => !prev)}>
          Filters
        </GoabButton>

        {!isMobile && (
          <GoabTabs initialTab={1} onChange={handleTabChange} stackOnMobile={false} variant="segmented">
            <GoabTab heading={
              <>
              <GoabTooltip content="Cards" position="bottom">
                <GoabIcon type="grid" size="small" fillColor="var(--goa-color-text-secondary)" ariaLabel="Cards"/>
              </GoabTooltip> 
              </>
            }/>
            <GoabTab heading={
              <>
              <GoabTooltip content="List">
                <GoabIcon type="list" size="small" fillColor="var(--goa-color-text-secondary)" ariaLabel="List"/>
              </GoabTooltip>
              </>
            }/>
          </GoabTabs>
        )}

        {isMobile && (
          <GoabMenuButton
            size="compact"
            type="tertiary"
            text={"Sort"}
            onAction={(e: GoabMenuButtonOnActionDetail) => handleSortAction(e.action)}
          >
            <GoabMenuAction
              text={`Status${getSortIndicator('status')}`}
              action="sort-status"
              icon={getSortIcon('status')}
            />
            <GoabMenuAction
              text={`Name${getSortIndicator('name')}`}
              action="sort-name"
              icon={getSortIcon('name')}
            />
            {sortConfig.primary && (
              <GoabMenuAction
                text="Clear sort"
                action="clear-sort"
                variant="destructive"
              />
            )}
          </GoabMenuButton>
        )}

      </GoabBlock>

      {filterChips.length > 0 && (
        <div className="chips-container">
          <GoabIcon type="filter-lines" size="small" fillColor="var(--goa-color-text-secondary)" mr="2xs"/>
          {/* Filter chips */}
          {filterChips.map((chip) => (
              <GoabFilterChip
                  key={`${chip.category}-${chip.value}`}
                  content={chip.label}
                  onClick={() => removeAppliedFilter(chip.category, chip.value)}
              />
          ))}
          <GoabLink color="interactive" size="small">
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    resetFilters();
                }}
            >
                Clear all
            </a>
          </GoabLink>
        </div>
      )}

      {/* Card view */} 
      
      <div
        style={{
          display: activeTab === 'Cards' || isMobile ? 'grid' : 'none',
          gridTemplateColumns: (filteredCards.length != 0 || cards.length === 0) && "repeat(auto-fill, minmax(15rem, 1fr))",
          gap: "var(--goa-space-xl)",
          width: "100%"
        }}
      >
        {cards.length === 0 ? (
          <>
            <GoabSkeleton type="card" size="4" />
            <GoabSkeleton type="card" size="4" />
            <GoabSkeleton type="card" size="4" />
            <GoabSkeleton type="card" size="4" />
            <GoabSkeleton type="card" size="4" />
            <GoabSkeleton type="card" size="4" />
            <GoabSkeleton type="card" size="4" />
            <GoabSkeleton type="card" size="4" />
          </>
        ) : filteredCards.length === 0 ? (
          <EmptyState onButtonClick={resetFilters} />
        ) : (
          filteredCards.map((card) => (
            <ExampleCard
              key={card.name}
              name={card.name}
              tags={card.tags}
              description={card.description}
              status={card.status}
              openIssues={issueCounts[card.name]}
              isNew={card.isNew}
              designComponentFigmaUrl={card.designComponentFigmaUrl}
              designContributionFigmaUrl={card.designContributionFigmaUrl}
              imageFolder="example-thumbnails"
              githubLink={card.url}
            />
          ))
        )}
      </div>

      {/* List view */

      !isMobile && ( 
        <div
          style={{
            display: activeTab === 'List' ? 'block' : 'none',
          }}
        >
          <GoabDataGrid keyboardNav="table" keyboardIconPosition="right">
            <GoabTable width="100%" onSort={handleTableSort}>
              <thead>
                <tr>
                  <th>
                    <GoabTableSortHeader
                      name="status"
                      direction={sortConfig.primary?.key === 'status' ? (sortConfig.primary.direction === 'asc' ? 'asc' : 'desc') : undefined}
                    >
                      Status
                    </GoabTableSortHeader>
                  </th>
                  <th>
                    <GoabTableSortHeader
                      name="name"
                      direction={sortConfig.primary?.key === 'name' ? (sortConfig.primary.direction === 'asc' ? 'asc' : 'desc') : undefined}
                    >
                      Name
                    </GoabTableSortHeader>
                  </th>
                  <th style={{ minWidth: "130px" }}>Category</th>
                  <th style={{ width: "150px", minWidth: "130px" }}>Github</th>
                </tr>
                </thead>
              <tbody>
              {cards.length === 0 ? (
                <>
                  <tr>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                  </tr>
                  <tr>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                  </tr>
                  <tr>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                  </tr>
                  <tr>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                  </tr>
                  <tr>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                  </tr>
                  <tr>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                  </tr>
                  <tr>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                  </tr>
                  <tr>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                    <td colSpan={1}><GoabSkeleton type="title" size="3" /></td>
                  </tr>
                </>
              ) : filteredCards.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <EmptyState onButtonClick={resetFilters} />
                  </td>
                </tr>
              ) : (
                filteredCards.map((card, index) => (
                  <tr key={card.name} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#F8F8F8" }}>
                    <td style={{ width: "100px" }}>
                      <GoabBadge
                        mt="2xs"
                        type={card.status === "Available" ? "success" : card.status === "In Progress" ? "important" : "archived"}
                        content={card.status}
                        emphasis={card.status === "Not Published" ? "subtle" : "strong"} />
                    </td>
                    <td>
                      {card.status === "Available" ? (
                        <Link to={`/examples/${card.slug}`}>
                          {toSentenceCase(card.name)}
                        </Link>
                      ) : (
                        <span>{toSentenceCase(card.name)}</span>
                      )}
                    </td>
                    <td> 
                      {(() => {
                        const getTagBadgeType = (tag: string) => {
                          
                          if (/Structure and navigation|Public form|Content layout|Inputs and actions|Technical|Feedback and alerts|Question page|Service type/i.test(tag)) {
                            return "sunset";
                          }
                          
                          if (/Interaction|Task|Page|Service/i.test(tag)) {
                            return "lilac"; 
                          } 

                          if (/Ask a user for...|Help a user to.../i.test(tag)) {
                            return "sky";
                          } 

                          // fallback rules similar to other headers
                          return "information";
                        };

                        return card.tags?.map((tag) => (
                          <GoabBadge
                            key={tag}
                            type={getTagBadgeType(tag)}
                            mt="2xs"
                            mb="2xs"
                            mr="2xs"
                            content={tag}
                            emphasis="subtle"
                          />
                        ));
                      })()}
                    </td>
                    <td style={{ minWidth: "135px", maxWidth: "170px" }}>
                      {card.url ? (
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View issue
                        </a>
                      ) : (
                        <a
                          href={`https://github.com/GovAlta/design-system-backlog/issues?q=${encodeURIComponent(card.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View issue
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </GoabTable>
          </GoabDataGrid>
        </div>
      )}
      <GoabDrawer
        heading="Filters"
        position="right"
        mt="m"
        onClose={() => setShowFilters(false)}
        open={showFilters}
        actions={
          <GoabButtonGroup alignment="start" gap="compact">
            <GoabButton type="primary" size="compact" onClick={() => setShowFilters(false)}>
                Close filters
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <GoabBlock direction={"column"} gap={"l"}>
          <GoabFormItem label="Size">
            {sizes.map((sz) => (
              <GoabCheckbox
                key={sz}
                name={sz}
                text={sz}
                mb="xs"
                checked={selectedFilters.size.includes(sz)}
                onChange={(detail) => {
                  handleCheckboxChange("size", sz, detail.checked);
                }}
              />
            ))}
          </GoabFormItem>

          <GoabFormItem label="User Goal">
            {userGoals.map((goal) => (
              <GoabCheckbox
                key={goal}
                name={goal}
                text={goal}
                mb="xs"
                checked={selectedFilters.userGoal.includes(goal)}
                onChange={(detail) => {
                  handleCheckboxChange("userGoal", goal, detail.checked);
                }}
              />
            ))}
          </GoabFormItem>

          <GoabFormItem label="Category">
            {categories.map((cat) => (
              <GoabCheckbox
                key={cat}
                name={cat}
                text={cat}
                checked={selectedFilters.category.includes(cat)}
                mb="xs"
                onChange={(detail) => {
                  handleCheckboxChange("category", cat, detail.checked);
                }}
              />
            ))}
          </GoabFormItem>
        </GoabBlock>
      </GoabDrawer>
    </div>
  );
}