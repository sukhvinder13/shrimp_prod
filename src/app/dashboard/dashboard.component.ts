import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddFarmService } from 'app/services/add-farm/add-farm.service';
import * as Chartist from 'chartist';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ChartAnimationConfig {
  seq: number;
  delays: number;
  durations: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  customerData: any[] = [];
  totalRevenue = 0;
  activeCustomers = 0;
  private destroy$ = new Subject<void>();

  constructor(private addFarmService: AddFarmService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardData(): void {
    this.addFarmService
      .getCustoemrs()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.customerData = data || [];
      });

    this.addFarmService
      .getCustomerCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data) {
          this.totalRevenue = data.totalValue || 0;
          this.activeCustomers = data.transactionCount || 0;
        }
      });
  }

  private animateChart(chart: any, dataType: 'line' | 'bar'): void {
    const config: ChartAnimationConfig = {
      seq: 0,
      delays: 80,
      durations: 500
    };

    chart.on('draw', (data: any) => {
      if (dataType === 'line' && (data.type === 'line' || data.type === 'area')) {
        this.animateLineChart(data);
      } else if (dataType === 'bar' && data.type === 'bar') {
        this.animateBarChart(data, config);
      } else if (dataType === 'line' && data.type === 'point') {
        this.animatePoint(data, config);
      }
    });
  }

  private animateLineChart(data: any): void {
    data.element.animate({
      d: {
        begin: 600,
        dur: 700,
        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
        to: data.path.clone().stringify(),
        easing: Chartist.Svg.Easing.easeOutQuint
      }
    });
  }

  private animatePoint(data: any, config: ChartAnimationConfig): void {
    config.seq++;
    data.element.animate({
      opacity: {
        begin: config.seq * config.delays,
        dur: config.durations,
        from: 0,
        to: 1,
        easing: 'ease'
      }
    });
  }

  private animateBarChart(data: any, config: ChartAnimationConfig): void {
    config.seq++;
    data.element.animate({
      opacity: {
        begin: config.seq * config.delays,
        dur: config.durations,
        from: 0,
        to: 1,
        easing: 'ease'
      }
    });
  }
}
